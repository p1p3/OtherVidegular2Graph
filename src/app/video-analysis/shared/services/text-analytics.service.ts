import { Keyword } from './../models/text-analytics/keyword.model';
import { Response } from '@angular/http';
import { IAnalyticsService } from './../../../core/services/def/analytics.service';
import { TextAnalytics } from './../models/text-analytics/text-analytics.model';
import { Observable } from 'rxjs/Rx';
import { ITextAnalyticsService } from './def/text-analytics.service';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class TextAnalyticsService implements ITextAnalyticsService {

    constructor( @Inject('IAnalyticsService') private analyticsService: IAnalyticsService) { }

    getRecordTextAnalytics(recordId: string): Observable<TextAnalytics> {
        return this.analyticsService
            .getRecordEmotions(recordId)
            .map(response => this.mapResponseToTextAnalytics(response));
    }

    private mapResponseToTextAnalytics(response: Response): TextAnalytics {
        let textAnalyticsResponse = JSON.parse(response.json().TextAnalytics) as any;
        let keyWords = new Array<Keyword>();
        let oneWord = textAnalyticsResponse.keyword_density['1 word'];
        let twoWords = textAnalyticsResponse.keyword_density['2 words'];
        let threeWords = textAnalyticsResponse.keyword_density['3 words'];

        keyWords = keyWords.concat(this.extractKeywords(oneWord, 1));
        keyWords = keyWords.concat(this.extractKeywords(twoWords, 2));
        keyWords = keyWords.concat(this.extractKeywords(threeWords, 3));

        let textAnalytics = new TextAnalytics(textAnalyticsResponse.text,
            textAnalyticsResponse.flesch_kincaid_reading_ease,
            textAnalyticsResponse.flesch_kincaid_grade_level,
            textAnalyticsResponse.gunning_fog_score,
            textAnalyticsResponse.coleman_liau_index,
            textAnalyticsResponse.smog_index,
            textAnalyticsResponse.automated_readability_index,
            textAnalyticsResponse.spache_readability_score,
            textAnalyticsResponse.dale_chall_readability_score,
            textAnalyticsResponse.passive_voice_count,
            textAnalyticsResponse.adverb_count,
            textAnalyticsResponse.cliche_count,
            textAnalyticsResponse.long_word_count,
            textAnalyticsResponse.high_syllable_word_count,
            textAnalyticsResponse.reading_time,
            textAnalyticsResponse.speaking_time,
            textAnalyticsResponse.sentiment,
            textAnalyticsResponse.longest_word_letters,
            textAnalyticsResponse.longest_word_syllables,
            textAnalyticsResponse.longest_sentence_words,
            keyWords);

        return textAnalytics;
    }

    private mapToKeyword(keywordResponse: any, numberOfWords: number): Keyword {
        return new Keyword(keywordResponse.item, keywordResponse.count, keywordResponse.percentage, numberOfWords);
    }

    private extractKeywords(keywordsJson: any, numberOfWords: number): Array<Keyword> {
        let keyWords = new Array<Keyword>();
        for (let key in keywordsJson) {
            if (!keywordsJson.hasOwnProperty(key)) { continue; }
            let keywordResponse = keywordsJson[key];
            let keyword = this.mapToKeyword(keywordResponse, numberOfWords);
            keyWords.push(keyword);
        }
        return keyWords;
    }

}
