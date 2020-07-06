import React from 'react';
import { useState, useEffect } from 'react';
import { apiService } from '../../utils/api';
import { findWithId } from '../../utils/calculations';
import Header from '../Header';
import { useHistory } from 'react-router-dom';


interface PlaySetupProps { }

const PlaySetup: React.FC<PlaySetupProps> = ({ }) => {
    const history = useHistory();

    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [selectedCourseName, setSelectedCourseName] = useState<string>(null);
    const [teeBoxOptions, setTeeBoxOptions] = useState<TeeBox[]>([]);
    const [selectedTee, setSelectedTee] = useState<string | null>(null);
    const [slope, setSlope] = useState<number>(null);
    const [courseRating, setCourseRating] = useState<number>(null);
    const [teeGender, setTeeGender] = useState<string>(null);
    const [courses, setCourses] = useState<GolfCourse[]>([]);


    const getData = async () => {
        let courses: GolfCourse[] = [];
        try {
            let allcourses: any = await apiService('/api/courses');
            if (allcourses) {
                allcourses.map((course: any) => {
                    let courseTees = [];
                    for (let i = 1; i <= 15; i++) {
                        let key = "teeName" + i;
                        if (!course[key]) break;
                        else {
                            courseTees.push({
                                name: course[key],
                                gender: course["teeGender" + i],
                                par: course["teePar" + i],
                                courseRating: course["courseRating" + i],
                                bogeyRating: course["bogeyRating" + i],
                                slopeRating: course["slopeRating" + i]
                            });
                        }
                    }
                    let courseObj = {
                        id: course.id,
                        clubname: course.clubname,
                        city: course.city,
                        state: course.state,
                        tees: courseTees
                    }
                    courses.push(courseObj);

                });
                setCourses(courses);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleCourseSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        let input: GolfCourse = JSON.parse(e.target.value);
        setSelectedCourseId(input.id);
        setSelectedCourseName(input.clubname);
        if (input.id === 0) {
            setTeeBoxOptions([])
        } else {
            let index = findWithId(courses, input.id)
            setTeeBoxOptions(courses[index].tees);
        }
    }

    const handleTeeSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        let teeObject: TeeBox = JSON.parse(e.target.value);
        setSelectedTee(teeObject.name);
        setSlope(Number(teeObject.slopeRating));
        setCourseRating(Number(teeObject.courseRating));
        setTeeGender(teeObject.gender);
    }


    useEffect(() => {
        getData();
    }, []);


    return (
        <>
            <Header color='header-dark' loggedIn={true} />
            <div className="container" id="content-container">
                <div className="py-3 container rounded-0 shadow-lg mt-5">


                    <div className="form-group">
                        <label>Course Name</label>
                        <select className="form-control" onChange={handleCourseSelect}>
                            <option value='0'>--Select One--</option>
                            {courses.map(course => {
                                return (
                                    <option key={course.id} value={JSON.stringify(course)}>{course.clubname}</option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Tee Box</label>
                        <select
                            className="form-control"
                            onChange={handleTeeSelect}
                            disabled={!(selectedCourseId) || (selectedCourseId === 0)}
                        >
                            <option>--Select One--</option>
                            {teeBoxOptions.map(teeBox => {
                                return (
                                    <option
                                        key={`${teeBox.name}-${teeBox.gender}`}
                                        value={JSON.stringify(teeBox)}
                                    >
                                        {teeBox.name} - ({teeBox.courseRating} / {teeBox.slopeRating}) ({teeBox.gender})
                                    </option>
                                );
                            })}
                        </select>
                    </div>



                    <button
                        type="submit"
                        className="btn btn-primary rounded-0"
                        disabled={selectedCourseId === null || selectedTee === null}
                        onClick={() => history.push("/scorecard", {
                            selectedCourseId,
                            selectedCourseName,
                            slope,
                            courseRating,
                            teeGender,
                            selectedTee
                        })}
                    >
                        Start Round
                    </button>
                </div >
            </div>

        </>
    );

}


interface GolfCourse {
    id: number;
    clubname: string;
    city: string;
    state: string;
    tees: TeeBox[];
}

interface TeeBox {
    name: string;
    gender: string;
    par: number;
    courseRating: number;
    bogeyRating: number;
    slopeRating: number;
}

// interface RawCourseData {
//     id: number,
//     clubname: string,
//     city: string,
//     state: string,
//     [index: string]: string | number
// }

export default PlaySetup;



