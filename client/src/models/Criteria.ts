export interface Criteria {
    freeText: string;
    type: string;
    fromReleasedYear: Date | null;
    fromRating: number | null;
}