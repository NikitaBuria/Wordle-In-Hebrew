var words = ["רשימה", "סיפור", "אגודל", "וורדל", "מניפה", "מריצה", "רכישה", "ענבים", "חביות", "מכונה",
    "נקישה", "דפדפן", "בקבוק", "עיתון", "שניצל", "ספורט", "גיטרה", "גאנדי", "מונית", "תופסן", "ציפית",
    "שטרות", "מכולת", "מנורה", "יהודי", "ברירה", "ערכים", "בחינה", "שרביט", "שולחן", "רובוט", "מכלול", "פרחים",
    "בורגר", "מוותר", "צדדים", "מילון", "מטריה", "פגיעה", "זינוק", "זרנוק", "רשימה", "סגנון", "ציפור", "נקיון", "אתמול", "אתרוג",
    "מספיק", "מפליק", "מצדיק", "מפליל", "תלמיד", "תרמיל", "תרשים", "חתולה", "אפרוח"];
var usersBoard = {
    row: 0,
    colum: 0,
    wordToGuess: "",
    userWord: "",
    created: false,
    won: false
};
function addWord(letter) {
    if (usersBoard.won) {
        alert("זה כיף לנצח בפעם השנייה");
    }
    if (!usersBoard.created) {
        resetGame();
    }
    // אם המטריצה הגיעה לסופה אז תוצג הודעה שהפסדת
    if (lost()) {
        showLoserMessage();
        return;
    }
    if (usersBoard.colum == 5) {
        alert("השורה כבר מלאה");
        return;
    }
    if (usersBoard.colum <= 5) {
        if (usersBoard.colum == 5) {
            nextRow();
            usersBoard.colum = 1;
        }
        else {
            usersBoard.colum = usersBoard.colum + 1;
        }
    }
    usersBoard.userWord = usersBoard.userWord.concat(letter);
    var boxToAdd = document.getElementById(usersBoard.row + "-" + usersBoard.colum);
    // @ts-ignore
    boxToAdd.innerText = letter;
}
function getRandomWord() {
    // מגריל אינדקס ראנדומאלי שילקח מהמערך
    return Math.floor(Math.random() * words.length - 1);
}
function resetGame() {
    //מאפס את הנתונים של המשתמש
    usersBoard.wordToGuess = words[getRandomWord()];
    usersBoard.row = 1;
    usersBoard.colum = 0;
    usersBoard.userWord = "";
    usersBoard.created = true;
}
function showLoserMessage() {
    alert(" מילאת הכל ולא הצלחת לנחש מה המילה :( בהצלחה בפעם הבאה! אתה יכול לרענן את הדף בשביל להתחיל מחדש  " + usersBoard.wordToGuess + " זו המילה  ");
}
function checkWord() {
    //אם הוא ניצח אז הפונק' תצבע מה שצריך ותפסיק
    if (usersBoard.userWord == usersBoard.wordToGuess && usersBoard.created) {
        alert("כל הכבוד,אתה קוסם אמיתי ! ניחשת נכון את המילה וניצחת ! ");
        usersBoard.won = true;
        paintLetters();
        return;
        // בודק אם המטריצה מלאה ואז השחקן מפסיד
    }
    else if (lost()) {
        showLoserMessage();
        return;
    }
    // עובר על כל המילים על מנת לבדוק אם כבר יש את המילה
    for (var i = 0; i <= words.length - 1; i++) {
        if (usersBoard.userWord == words[i]) {
            paintLetters();
            resetUsersWord();
            nextRow();
            break;
        }
        else if (i == words.length - 1) {
            alert("המילה הזו לא קיימת במאגר");
            resetUsersWord();
            resetRow();
        }
    }
}
function nextRow() {
    //יורד שורה ומאפס את מספר העמודה
    usersBoard.row = usersBoard.row + 1;
    resetUserColum();
}
function lost() {
    return (usersBoard.row == 6 && usersBoard.colum == 5);
}
function paintLetters() {
    var colum;
    debugger;
    for (var i = 0; i < usersBoard.wordToGuess.length; i++) {
        //אם המיקומים שווים הוא יצבע בירוק וידלג על הבלוק הבא
        if (usersBoard.wordToGuess.charAt(i) == usersBoard.userWord.charAt(i)) {
            colum = i + 1;
            changeBackground(usersBoard.row + "-" + colum, "#538d4e");
            colum = 0;
            continue;
        }
        // גאם המיקומים לא שווים הוא יבדוק אם יש אות בסטרינג שקיימת בסטרינג של המילה המוגרלת אם כן הוא יצבע בהתאם ואם לא זו אות שלא קיימתי בסטרינג והוא יצבע את האות במקלדת
        for (var j = 0; j < usersBoard.userWord.length; j++) {
            if (usersBoard.userWord.charAt(i) == usersBoard.wordToGuess.charAt(j)) {
                colum = i + 1;
                changeBackground(usersBoard.row + "-" + colum, "#b59f3b");
                colum = 0;
                break;
            }
            if (j == usersBoard.wordToGuess.length - 1) {
                changeBackground(usersBoard.userWord.charAt(i), "#3a3a3c");
            }
        }
        colum = 0;
    }
}
function changeBackground(element, color) {
    // @ts-ignore
    document.getElementById(element).style.background = color;
}
function resetRow() {
    //עובר על כול השורה לפי עמודה ומאפס לסטרינג עם כלום
    var colum = usersBoard.colum;
    while (!(colum == 0)) {
        var boxToReset = document.getElementById(usersBoard.row + "-" + colum);
        // @ts-ignore
        boxToReset.innerText = "";
        colum = colum - 1;
    }
    resetUserColum();
}
function resetUserColum() {
    usersBoard.colum = 0;
}
function resetUsersWord() {
    usersBoard.userWord = "";
}
function deleteLetter() {
    //במקרה שהשחקן מנסה למחוק אחרי שהוא ניצח תוצג הודעה
    if (usersBoard.won) {
        alert("כבר ניצחת אחי");
        return;
    }
    //מקבל את  האלמנט שצריך למחוק לפי שורה ועמודה
    var boxToDelete = document.getElementById(usersBoard.row + "-" + usersBoard.colum);
    // @ts-ignore
    boxToDelete.innerText = "";
    //מעדכן גם בשדות של המשתמש שהמילה שונתה
    usersBoard.userWord = usersBoard.userWord.substring(0, usersBoard.userWord.length - 1);
    usersBoard.colum = usersBoard.colum - 1;
}
