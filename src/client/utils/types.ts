export interface Score {
    id: number;
    score: number;
    differential: number;
}

export interface Player {
    id: number;
    firstname: string;
    lastname: string;
}

export interface PlayerProfile {
    user1?: number;
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