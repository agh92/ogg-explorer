import { VoiceNote } from "interfaces";

export enum SortBy {
    NONE = 'none',
    LENGTH_ASCENDING = 'acending',
    LENGTH_DECENDING = 'descending'
}

export function getSortingFunction(currentSorting: SortBy): (a: VoiceNote, b: VoiceNote) => number {
    switch (currentSorting) {
        case SortBy.LENGTH_DECENDING:
            return (a, b) => ((b.length ? b.length : 0) - (a.length ? a.length : 0));
        case SortBy.LENGTH_ASCENDING:
            return (a, b) => ((a.length ? a.length : 0) - (b.length ? b.length : 0));
        default:
            throw new Error("Unsupported sorting");
    }
}

export function getNexSorting(currentSorting: SortBy) {
    switch (currentSorting) {
        case SortBy.NONE:
            return SortBy.LENGTH_ASCENDING;
        case SortBy.LENGTH_ASCENDING:
            return SortBy.LENGTH_DECENDING;
        case SortBy.LENGTH_DECENDING:
            return SortBy.NONE;
        default:
            throw new Error("Unsupported sorting");
    }
}