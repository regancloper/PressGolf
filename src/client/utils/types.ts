export interface Score {
    id: number;
    score: number;
    differential: number;
}

export interface Player {
    firstname: string;
    lastname: string;
    index: number;
}

export interface TableScore {
    id: number;
    userid: number;
    courseid: number;
    teeName: string;
    teeGender: string;
    score: number;
    differential: number;
    _created: string;
    clubname: string;
}