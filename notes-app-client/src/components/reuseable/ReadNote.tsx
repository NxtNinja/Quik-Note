import { SingleNote } from "@/utils/types/SingleNoteType";
import Layout from "../Layout";
import { useAtom } from "jotai";
import { CollectionAtom } from "@/utils/atoms/CollectionAtom";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { Raleway } from "next/font/google";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const raleway = Raleway({ subsets: ["latin"], weight: "300" });

const ReadNote = ({ noteType }: { noteType: SingleNote }) => {
  const [collection] = useAtom(CollectionAtom);
  const [isDownloading, setIsDownloading] = useState(false);

  const router = useRouter();

  const formatCreatedAt = (createdAt: any) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString();
  };

  let collectionName = "";

  collection.find((info) => {
    if (info.id === noteType.collection_id) {
      collectionName = info.coll_name;
    }
  });

  const handleDownloadPdf = () => {
    setIsDownloading(true);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "letter",
    });

    const title = noteType.title;
    const content = noteType.content;
    const createdAt = formatCreatedAt(noteType.created_at);

    // Calculate height of content based on font size and width of the page
    const lineHeight = 0.25; // Adjust as needed
    const maxWidth = 10; // Adjust as needed
    const lines = pdf.splitTextToSize(content, maxWidth);

    // Add content to PDF
    pdf.setFont(raleway.className);
    pdf.setFontSize(12);
    pdf.text(`Title: ${title}`, 0.5, 0.5);
    pdf.text(`Collection: ${collectionName}`, 0.5, 0.75);
    pdf.text(`Created at: ${createdAt}`, 0.5, 1);
    pdf.text(`Content:`, 0.5, 1.25, { align: "justify" });

    // Check if content fits on the current page
    let remainingLines = lines.length;
    let currentPage = 1;
    let yPos = 1.5; // Adjust as needed

    while (remainingLines > 0) {
      // Add lines to the current page
      const linesOnPage = Math.min(
        Math.floor((pdf.internal.pageSize.getHeight() - yPos) / lineHeight),
        remainingLines
      );
      const pageLines = lines.splice(0, linesOnPage);
      pdf.text(pageLines, 0.5, yPos + 0.25);
      remainingLines -= pageLines.length;

      // If there are remaining lines, add a new page
      if (remainingLines > 0) {
        pdf.addPage();
        currentPage++;
        yPos = 0.5; // Adjust as needed
      }
    }

    pdf.save(`${noteType.title}.pdf`);

    setIsDownloading(false);
  };

  return (
    <Layout>
      <div className="grid grid-cols-6 gap-8 md:ml-64 w-full md:w-[80%] mx-auto">
        <div className="col-span-4 md:mt-0 p-3 md:p-6 mt-12 bg-white overflow-hidden">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 flex flex-col justify-between  space-y-3">
              <p className="">{noteType.title}</p>
              <p className="text-sm font-normal">
                This note is from the{" "}
                <span className="font-bold">{collectionName}</span> collection
              </p>
              <div className="text-gray-600 text-sm mt-auto flex items-center gap-2">
                <p className="">Date created:</p>
                <p className="">{formatCreatedAt(noteType.created_at)}</p>
              </div>
            </div>
            <p className="text-gray-700 bg-transparent text-base text-justify w-full h-[500px] overflow-hidden overflow-y-auto p-3">
              {noteType.content}
            </p>
            <button
              onClick={handleDownloadPdf}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Download Note PDF
            </button>
          </div>
        </div>
        <div className="md:p-6 w-full col-span-2 h-fit lg:sticky lg:top-0">
          <div className="px-6 py-4 w-full space-y-6">
            <p className="">Some other collections</p>
            <div className="">
              {collection.map((items) =>
                items.id !== noteType.collection_id ? (
                  <div
                    key={items.id}
                    onClick={() => router.push(`/notes/${items.id}`)}
                    className="bg-gray-200 p-2 flex flex-col gap-3"
                  >
                    <p className="font-bold text-xl">{items.coll_name}</p>
                    <p className="text-sm">{items.coll_description}</p>
                  </div>
                ) : (
                  <div className="text-2xl font-semibold">
                    There are no other Collection{" "}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReadNote;
