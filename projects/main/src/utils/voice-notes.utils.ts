import { VoiceNote } from "interfaces";

export enum SortBy {
    NONE = 'none',
    LENGTH_ASCENDING = 'acending',
    LENGTH_DECENDING = 'descending'
}

const nextSortingLookUp: Map<SortBy, SortBy> = new Map(
    [
        [SortBy.NONE, SortBy.LENGTH_ASCENDING],
        [SortBy.LENGTH_ASCENDING, SortBy.LENGTH_DECENDING],
        [SortBy.LENGTH_DECENDING, SortBy.NONE]
    ]
);

const sortingFunctionLookUp: Map<SortBy, (a: VoiceNote, b: VoiceNote) => number> = new Map(
    [
        [SortBy.NONE, (a, b) => 0],
        [SortBy.LENGTH_ASCENDING, (a, b) => a.length - b.length],
        [SortBy.LENGTH_DECENDING, (a, b) => b.length - a.length]
    ]
);

export function sortVoiceNotes(unsortedVoiceNotes: VoiceNote[], sortBy: SortBy): { voiceNotes: VoiceNote[], nextSorting: SortBy } {
    const nextSorting = getNexSorting(sortBy);
    const sortingFunction = sortingFunctionLookUp.get(sortBy);
    return {
        voiceNotes: sortingFunction ? [...unsortedVoiceNotes].sort(sortingFunction) : unsortedVoiceNotes,
        nextSorting: nextSorting ? nextSorting : SortBy.NONE
    };
}

function getNexSorting(currentSorting: SortBy) {
    return nextSortingLookUp.get(currentSorting);
}