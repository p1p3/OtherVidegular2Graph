export class VideoMetadata {
    constructor(public name?: string,
        public submission_id?: number,
        public pres_id?: number,
        public attempt?: number,
        public overall_score?: number,
        public duration?: number,
        public challenge_id?: number
    ) { }
}
