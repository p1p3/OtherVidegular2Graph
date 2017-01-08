import { ReadAbilityScore } from './readability-score.model';

export interface ReadabilityTest {
    meaning: string;
    intro: string;
    scores: Array<ReadAbilityScore>;
    maxScore:number;
    lessIsBetter:boolean;
}