

/* 

    localStorage
    key : value

    Users :{
        Techer:{
        key : value
        key -> 0 1 2 3 ...
        value ->  // teacher data
        }

        Teacher : {
        0 : {
                fullName: "Mr. Ahmad",
                username: "admin",
                password: "admin123", 
          }
        
        1 : {
                fullName: "Mr. Ahmad",
                username: "admin",
                password: "admin123", 
          }
        }

        Student:{
        key : value
        key -> 0 1 2 3 ...
        value ->  // student data
        }

        Student:{
          0 : {
                fullName: "Sara Ali",
                nationalId: "9981234567",
                phone: "0791234567",
                username: "sara.ali",
                password: "12345",
                results : [0,1,2] // results keys
          }
      }

    }



    Exams: {
      key:value
      key -> 0 1 2 3 ...
      value -> // exams data 
    }
    
    Exams: {
        0 : {
            title: "Math Midterm",
            dateTime: "2026-07-20T10:00",
            status: "Active",  
            qustions : [0 , 1, 2]//qIDs
            totalPoints: 10
        }

        



    Quastions:{
        key: value
        key -> 0 1 2 3 ...
        value -> // quastions data
    }

    Questions: {
    0: {
        text: "1+1",
        option: {
            0: "1",
            1: "4",
            2: "0",
            3: "2"
        },
        correctAns: 3// index in option array
        type: "MCQ",// "MCQ" | "TrueFalse"
        points: 2
    }
}



   Results: {
    key: value
    key -> 0 1 2 3 ...
    value -> // one exam attempt by one student
}

Results: {
    0: {
        studentId: 0,          // key into Users.Student
        examId: 0,             // key into Exams
        submittedAt: "2026-07-20T10:15",
        totalPoints: 10,
        earnedPoints: 8,
        percentage: 80,
        passed: true,
        answers: {
            0: { //
                studentAns: 3, // index in option array 
                isCorrect: true,
                qustionID: 2
                pointsEarned: 2
            },
            1: {
                studentAns: 0 ,
                isCorrect: false,
                qustionID: 2,
                pointsEarned: 0
            }
        }
    }
}

*/


export function intiapp(){
    localStorage.clear()
  if(!localStorage.getItem("Users")){
    const user = {
      Teacher : {},
      Students : {}
    }
    localStorage.setItem("Users",JSON.stringify(user))
  }

  if (!localStorage.getItem("Exams")) {
        localStorage.setItem("Exams", JSON.stringify({}));
    }

    if (!localStorage.getItem("Questions")) {
        localStorage.setItem("Questions", JSON.stringify({}));
    }

    if (!localStorage.getItem("Results")) {
        localStorage.setItem("Results", JSON.stringify({}));
    }
}



function getNextKey(object) {
    const keys = Object.keys(object).map(Number); 

    if (keys.length === 0) {
        return 0; 
    }

    return Math.max(...keys) + 1;
}




export function createTeacher(fullName, username, password){
  const users = JSON.parse(localStorage.getItem("Users"))
  const newKey = getNextKey(users.Teacher)


  users.Teacher[newKey]={
    "fullName" : fullName,
    "username" : username,
    "password" : password
  }

  localStorage.setItem("Users",JSON.stringify(users))
  return newKey;
}




function getTeacher(teacherId){
  const teacher = JSON.parse(localStorage.getItem("Users")).Teacher[teacherId]
  return teacher
}



function getTeacherByUsername(username){
  const teachers = JSON.parse(localStorage.getItem("Users")).Teacher
  let found
  Object.values(teachers).forEach(teacher =>{
    if(teacher.username == username)
      found = teacher;
  })
  return found
}





export function createStudent(fullName, nationalId, phone, username, password){
  const data = JSON.parse(localStorage.getItem("Users")).Students
  const newKey = getNextKey(data);
  data[newKey] = {
    "fullName" : fullName,
    "nationalId" : nationalId,
    "phone" : phone,
    "username" : username,
    "password" : password
  }
}




function getStudent(studentId) {
    const data = JSON.parse(localStorage.getItem("Users"));
    return data.Student[studentId];
}




function getAllStudents() {
    const data = JSON.parse(localStorage.getItem("Users"));
    return Object.values(data.Student); // object → array of student objects
}



export function getStudentByUsername(username) {
    const students = getAllStudents();
    return students.find(s => s.username === username);
}



function addResultToStudent(studentId, resultId) {
    const data = JSON.parse(localStorage.getItem("Users"));
    data.Student[studentId].results.push(resultId);
    localStorage.setItem("Users", JSON.stringify(data));
}



export function createExam(title, dateTime, status, questionIds) {
    const data = JSON.parse(localStorage.getItem("Exams"));
    const newKey = getNextKey(data);

    data[newKey] = {
        title,
        dateTime,
        status,
        questions: questionIds // array of question ids
    };

    localStorage.setItem("Exams", JSON.stringify(data));
    return newKey;
}

function getExam(examId) {
    const data = JSON.parse(localStorage.getItem("Exams"));
    return data[examId];
}

function getAllExams() {
    const data = JSON.parse(localStorage.getItem("Exams"));
    return Object.values(data);
}

function getActiveExams() {
    const exams = getAllExams();
    return exams.filter(exam => exam.status === "Active");
}





function createQuestion(text, options, correctAnsIndex, type, points) {
    const data = JSON.parse(localStorage.getItem("Questions"));
    const newKey = getNextKey(data);

    data[newKey] = {
        text,
        option: options,       
        correctAns: correctAnsIndex,
        type,
        points
    };

    localStorage.setItem("Questions", JSON.stringify(data));
    return newKey;
}





function getQuestion(questionId) {
    const data = JSON.parse(localStorage.getItem("Questions"));
    return data[questionId];
}



function getQuestionsByIds(questionIdsArray) {
    const data = JSON.parse(localStorage.getItem("Questions"));
    return questionIdsArray.map(id => data[id]); 
}



/*
Results: {
    0: {
        studentId: 0,          // key into Users.Student
        examId: 0,             // key into Exams
        submittedAt: "2026-07-20T10:15",
        totalPoints: 10,
        earnedPoints: 8,
        percentage: 80,
        passed: true,
        answers: {
            0: { //
                studentAns: 3, // index in option array 
                isCorrect: true,
                qustionID: 2
                pointsEarned: 2
            },
            1: {
                studentAns: 0 ,
                isCorrect: false,
                qustionID: 2,
                pointsEarned: 0
            }
        }
    }

*/
function createResult(studentId, examId, ans, qId) {
    const data = JSON.parse(localStorage.getItem("Results"));
    const newKey = getNextKey(data);
    const exam = getExam(examId);
    let totalPoints = exam.totalPoints

    let earnedPoints = 0
    const answers ={}
    for(let i = 0; i < qId; i++){
        const question = questionId(qId[i])
        let isCor =question.correctAns == ans[i];
        let points;
        if(isCorrect)
            {
                points = question.points
                earnedPoints += points
            }
        else
            points = 0
 
        answers[i]={
            studentAns : ans[i],
            isCorrect :`${isCor}`,
            qustionID : qId[i],
            pointsEarned : `${points}`
        }
        let percentage = earnedPoints/totalPoints *100
        let passed = percentage > 49
    }


    data[newKey] = {
        studentId,
        examId,
        submittedAt: new Date().toISOString(),
        totalPoints,
        earnedPoints,
        percentage,
        passed,
        answers
    };

    localStorage.setItem("Results", JSON.stringify(data));

    addResultToStudent(studentId, newKey); // keep Student.results in sync, per earlier discussion

    return newKey;
}


// create exam edit (totale points)

function getResult(resultId) {
    const data = JSON.parse(localStorage.getItem("Results"));
    return data[resultId];
}




function getResultsByStudent(studentId) {
    const data = JSON.parse(localStorage.getItem("Results"));
    return Object.values(data).filter(r => r.studentId === studentId);
}
