
/* ==========================
   TASK MANAGEMENT
========================== */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* ==========================
   ADD TASK
========================== */

function addTask() {

    const taskName =
        document.getElementById("taskName").value;

    const subject =
        document.getElementById("subject").value;

    const dueDate =
        document.getElementById("dueDate").value;

    const priority =
        document.getElementById("priority").value;

    if (
        taskName === "" ||
        subject === "" ||
        dueDate === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    const task = {

        id: Date.now(),

        taskName,

        subject,

        dueDate,

        priority,

        completed: false

    };

    tasks.push(task);

    saveTasks();

    displayTasks();

    document.getElementById("taskName").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("dueDate").value = "";

}

/* ==========================
   SAVE TASKS
========================== */

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

/* ==========================
   DISPLAY TASKS
========================== */

function displayTasks() {

    const taskList =
        document.getElementById("taskList");

    if (!taskList) return;

    taskList.innerHTML = "";

    tasks.forEach(task => {

        let priorityClass = "";

        if (task.priority === "High") {
            priorityClass = "priority-high";
        }

        else if (task.priority === "Medium") {
            priorityClass = "priority-medium";
        }

        else {
            priorityClass = "priority-low";
        }

        taskList.innerHTML += `

        <div class="task-card">

            <h3>
                ${task.completed ? "✅" : "📌"}
                ${task.taskName}
            </h3>

            <p>
                Subject:
                ${task.subject}
            </p>

            <p>
                Due Date:
                ${task.dueDate}
            </p>

            <p class="${priorityClass}">
                Priority:
                ${task.priority}
            </p>

            <div class="task-actions">

                <button
                class="complete-btn"
                onclick="toggleTask(${task.id})">

                    ${task.completed
                        ? "Undo"
                        : "Complete"}

                </button>

                <button
                class="delete-btn"
                onclick="deleteTask(${task.id})">

                    Delete

                </button>

            </div>

        </div>

        `;

    });

}

/* ==========================
   COMPLETE TASK
========================== */

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.completed =
                !task.completed;

        }

        return task;

    });

    saveTasks();

    displayTasks();

}

/* ==========================
   DELETE TASK
========================== */

function deleteTask(id) {

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks();

    displayTasks();

}

/* ==========================
   SEARCH TASK
========================== */

function searchTasks() {

    const searchValue =
        document
        .getElementById("searchTask")
        .value
        .toLowerCase();

    const taskCards =
        document.querySelectorAll(
            ".task-card"
        );

    taskCards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        if (
            text.includes(searchValue)
        ) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

}

/* ==========================
   DASHBOARD STATS
========================== */

function updateDashboard() {

    const totalTasks =
        document.getElementById(
            "totalTasks"
        );

    const completedTasks =
        document.getElementById(
            "completedTasks"
        );

    const pendingTasks =
        document.getElementById(
            "pendingTasks"
        );

    if (totalTasks) {

        totalTasks.textContent =
            tasks.length;

    }

    if (completedTasks) {

        completedTasks.textContent =
            tasks.filter(
                task => task.completed
            ).length;

    }

    if (pendingTasks) {

        pendingTasks.textContent =
            tasks.filter(
                task => !task.completed
            ).length;

    }

}

/* ==========================
   TODAY'S FOCUS
========================== */

function updateFocus() {

    const focus =
        document.getElementById(
            "todayFocus"
        );

    if (!focus) return;

    const pendingTask =
        tasks.find(
            task => !task.completed
        );

    if (pendingTask) {

        focus.textContent =
            pendingTask.taskName;

    }

    else {

        focus.textContent =
            "All tasks completed 🎉";

    }

}

/* ==========================
   DAILY QUOTES
========================== */

const quotes = [

    "Success is the sum of small efforts repeated daily.",

    "The secret of getting ahead is getting started.",

    "Small progress is still progress.",

    "Focus on the goal, not the obstacles.",

    "Consistency beats intensity."

];

function loadQuote() {

    const quoteElement =
        document.getElementById(
            "quoteText"
        );

    if (!quoteElement) return;

    const randomQuote =
        quotes[
            Math.floor(
                Math.random() *
                quotes.length
            )
        ];

    quoteElement.textContent =
        randomQuote;

}

/* ==========================
   INITIAL LOAD
========================== */

displayTasks();

updateDashboard();

updateFocus();

loadQuote();

/* ==========================
   EXAM TRACKER
========================== */

let exams =
    JSON.parse(
        localStorage.getItem("exams")
    ) || [];

/* ==========================
   ADD EXAM
========================== */

function addExam() {

    const examName =
        document.getElementById("examName")?.value;

    const examSubject =
        document.getElementById("examSubject")?.value;

    const examDate =
        document.getElementById("examDate")?.value;

    if (
        !examName ||
        !examSubject ||
        !examDate
    ) {

        alert("Please fill all fields");
        return;

    }

    const exam = {

        id: Date.now(),

        examName,

        examSubject,

        examDate

    };

    exams.push(exam);

    saveExams();

    displayExams();

    updateExamCount();

    document.getElementById("examName").value = "";
    document.getElementById("examSubject").value = "";
    document.getElementById("examDate").value = "";

}

/* ==========================
   SAVE EXAMS
========================== */

function saveExams() {

    localStorage.setItem(
        "exams",
        JSON.stringify(exams)
    );

}

/* ==========================
   DISPLAY EXAMS
========================== */

function displayExams() {

    const examList =
        document.getElementById("examList");

    if (!examList) return;

    examList.innerHTML = "";

    exams.forEach(exam => {

        const today =
            new Date();

        const examDay =
            new Date(exam.examDate);

        const diffTime =
            examDay - today;

        const daysLeft =
            Math.ceil(
                diffTime /
                (1000 * 60 * 60 * 24)
            );

        examList.innerHTML += `

        <div class="exam-card">

            <h3>
                ${exam.examName}
            </h3>

            <p>
                Subject:
                ${exam.examSubject}
            </p>

            <p>
                Date:
                ${exam.examDate}
            </p>

            <p class="days-left">

                ${
                    daysLeft >= 0
                    ? `${daysLeft} Days Left`
                    : "Exam Completed"
                }

            </p>

            <button
                class="delete-exam"
                onclick="deleteExam(${exam.id})">

                Delete

            </button>

        </div>

        `;

    });

}

/* ==========================
   DELETE EXAM
========================== */

function deleteExam(id) {

    exams = exams.filter(
        exam => exam.id !== id
    );

    saveExams();

    displayExams();

    updateExamCount();

}

/* ==========================
   DASHBOARD EXAM COUNT
========================== */

function updateExamCount() {

    const upcomingExams =
        document.getElementById(
            "upcomingExams"
        );

    if (!upcomingExams) return;

    const today = new Date();

    const activeExams =
        exams.filter(exam => {

            return (
                new Date(exam.examDate)
                >= today
            );

        });

    upcomingExams.textContent =
        activeExams.length;

}

/* ==========================
   INITIAL LOAD
========================== */

displayExams();

updateExamCount();
/* ==========================
   PROGRESS TRACKER
========================== */

function updateProgressPage() {

    const totalTasksElement =
        document.getElementById("progressTotal");

    if (!totalTasksElement) return;

    const completedTasksElement =
        document.getElementById("progressCompleted");

    const pendingTasksElement =
        document.getElementById("progressPending");

    const completionPercentElement =
        document.getElementById("completionPercent");

    const progressFill =
        document.getElementById("progressFill");

    const progressText =
        document.getElementById("progressText");

    const productivityStatus =
        document.getElementById("productivityStatus");

    const totalTasks = tasks.length;

    const completedTasks =
        tasks.filter(task => task.completed).length;

    const pendingTasks =
        totalTasks - completedTasks;

    let percentage = 0;

    if (totalTasks > 0) {

        percentage =
            Math.round(
                (completedTasks / totalTasks) * 100
            );

    }

    totalTasksElement.textContent =
        totalTasks;

    completedTasksElement.textContent =
        completedTasks;

    pendingTasksElement.textContent =
        pendingTasks;

    completionPercentElement.textContent =
        percentage + "%";

    if (progressFill) {

        progressFill.style.width =
            percentage + "%";

    }

    if (progressText) {

        progressText.textContent =
            percentage + "% Completed";

    }

    if (productivityStatus) {

        if (percentage >= 90) {

            productivityStatus.textContent =
                "Excellent 🎉";

            productivityStatus.style.color =
                "#22c55e";

        }

        else if (percentage >= 70) {

            productivityStatus.textContent =
                "Good 👍";

            productivityStatus.style.color =
                "#38bdf8";

        }

        else if (percentage >= 50) {

            productivityStatus.textContent =
                "Average ⚠️";

            productivityStatus.style.color =
                "#f59e0b";

        }

        else {

            productivityStatus.textContent =
                "Needs Improvement ❌";

            productivityStatus.style.color =
                "#ef4444";

        }

    }

}

/* ==========================
   LOAD PROGRESS PAGE
========================== */

updateProgressPage();
