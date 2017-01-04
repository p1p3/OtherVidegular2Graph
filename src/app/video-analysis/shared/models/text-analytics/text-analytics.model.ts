import { Keyword } from './keyword.model';
export class TextAnalytics {
    constructor(public text: string,
        public fleschKincaidReadingEase: number,
        public fleschKincaidGradeLevel: number,
        public gunningFogScore: number,
        public colemanLiauIndex: number,
        public smogIndex: number,
        public automatedReadabilityIndex: number,
        public spacheReadabilityScore: number,
        public daleChallReadabilityScore: number,
        public passiveVoiceCount: number,
        public adverbCount: number,
        public clicheCount: number,
        public longWordCount: number,
        public highSyllableWordCount: number,
        public readingTime: number,
        public speakingTime: number,
        public sentiment: string,
        public longestWordLetters: string,
        public longestWordSyllables: string,
        public longestSentenceWords: string,
        public keywordDensity: Array<Keyword>
    ) {

    }
}
