export interface SingleNoteType {
    status: number
    message: string
    data: SingleNote
}

export interface SingleNote {
    id: string
    title: string
    content: string
    created_at: string
    collection_id: string
}
