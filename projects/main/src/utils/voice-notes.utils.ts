import { VoiceNote } from "interfaces";

export enum SortBy {
    NONE = 'none',
    LENGTH_ASCENDING = 'acending',
    LENGTH_DECENDING = 'descending'
}

export function sortVoiceNotes(unsortedVoiceNotes: VoiceNote[], sortBy: SortBy): { voiceNotes: VoiceNote[], nextSorting: SortBy } {
    const nextSorting = getNexSorting(sortBy);

    if (sortBy !== SortBy.NONE) {
        const sortingFunction = getSortingFunction(sortBy);
        return { voiceNotes: [...unsortedVoiceNotes].sort(sortingFunction), nextSorting };
    }

    return { voiceNotes: unsortedVoiceNotes, nextSorting };
}

function getSortingFunction(currentSorting: SortBy): (a: VoiceNote, b: VoiceNote) => number {
    switch (currentSorting) {
        case SortBy.LENGTH_DECENDING:
            return (a, b) => (b.length - a.length);
        case SortBy.LENGTH_ASCENDING:
            return (a, b) => (a.length - b.length);
        default:
            throw new Error("Unsupported sorting");
    }
}

function getNexSorting(currentSorting: SortBy) {
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