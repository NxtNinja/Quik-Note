export interface CollectionType {
    status: number
    message: string
    data: Collection[]
}

export interface SingleCollection {
    status: number
    message: string
    data: Collection
}

export interface Collection {
    id: string
    coll_name: string
    coll_description: string
    created_at: string
    user_created: string
}
