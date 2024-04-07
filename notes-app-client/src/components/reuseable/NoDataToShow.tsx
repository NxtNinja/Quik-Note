import Image from "next/image";
import Layout from "../Layout";
import { useRouter } from "next/router";

const NoDataToShow = () => {
  const router = useRouter();
  return (
    <>
      <Layout>
        <div className="md:ml-64 mt-32 h-screen flex flex-col justify-center items-center md:mt-0 p-4 space-y-7">
          <Image
            src={`/Nothing_to_show_page.svg`}
            width={500}
            height={500}
            alt="Nothing to show"
          />
          <p className="absolute bottom-32 text-3xl font-bold">
            There is No data to show. Please add something
          </p>
          <button
            onClick={() => router.push(`/`)}
            className="bg-blue-500 absolute w-fit bottom-20 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Go Back to HomePage
          </button>
        </div>
      </Layout>
    </>
  );
};

export default NoDataToShow;
