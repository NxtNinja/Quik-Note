export interface NoteType {
    status: number
    message: string
    data: Note[]
}

export interface SingleNote {
    status: number
    message: string
    data: Note
}

export interface Note {
    id: string
    title: string
    content: string
    created_at: string
    collection_id: string
}
