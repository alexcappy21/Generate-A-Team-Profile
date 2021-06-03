const inquirer = require('inquirer')
const fs = require ('fs')

const Employee = require('./lib/employee')
const Manager = require('./lib/manager')
const Engineer = require('./lib/engineer')
const Intern = require('./lib/intern')

const welcomeTeam = "Welcome to this command-line application that will help you gather your team basic info and easily access to their emails and GitHub profiles. Please enter all your team members information as requested"
let completeTeam = [];


console.log(welcomeTeam)



// prompts for information
function addManager(){
inquirer.prompt ([
    {
    type:'input', 
    name: 'name',
    message:'Please enter the Manager Name',    
    
},
{
    type:'input', 
    name: 'id',
    message:'Please enter the Manager Employee ID',    
    
},
{
    type:'input', 
    name: 'email',
    message:'Please enter the Manager email address',    
    
},
{
    type:'input', 
    name: 'officeNumber',
    message:'Please enter the Manager office number',    
    
},


])
.then(function(data){
    const name = data.name
    const id = data.id
    const email = data.email
    const officeNumber = data.officeNumber
    const teamMember = new Manager(name, id, email, officeNumber)
    completeTeam.push(teamMember)
    addTeamMembers();
})

}

function addTeamMembers() {
    inquirer.prompt([
        {
            type:'list',
            message:'What would you like to do?',
            choices:['Add an Engineer','Add an Intern','Display my Team'],
            name:'addMember',
        }

    ])
.then(function(data){
    switch (data.addMember){
        case "Add an Engineer":
        addEngineer();
        break;
        
        case 'Add an Intern':
            addIntern();
            break;

        case 'Display my Team':
            finalizeTeam();
            break;

    }

})
}

function addEngineer() {
    inquirer.prompt([
        {
            type:'input', 
            name: 'name',
            message:'Please enter your Name',    
            
        },
        {
            type:'input', 
            name: 'id',
            message:'Please enter the your Employee ID',    
            
        },
        {
            type:'input', 
            name: 'email',
            message:'Please enter your email address',    
            
        },

        {
            type:'input', 
            name: 'github',
            message:'Please enter the your GitHub username ',    
            
        },
        


    ])
    .then(function(data){
        const name = data.name;
        const id = data.id;
        const email = data.email;
        const github = data.github;
        const teamMember = new Engineer(name, id, email, github)
        completeTeam.push(teamMember);
        addTeamMembers()

    })
}

function addIntern () {
    inquirer.prompt ([
        {
            type:'input', 
            name: 'name',
            message:'Please enter your Name',    
            
        },
        {
            type:'input', 
            name: 'id',
            message:'Please enter your Employee ID',    
            
        },
        {
            type:'input', 
            name: 'email',
            message:'Please enter your email address',    
            
        },

        {
            type:'input', 
            name: 'school',
            message:'Please enter the name of your school',    
            
        },
    ])
    .then(function(data){
        const name = data.name;
        const id = data.id;
        const email = data.email;
        const school = data.school;
        const teamMember = new Intern(name, id, email, school)
        completeTeam.push(teamMember)
        addTeamMembers();
        // console.log(completeTeam)
    })
}

function finalizeTeam () {
    const completeHtml = []
    const startingHtml = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Profile Generator</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <link href="style.css" rel="stylesheet" type="text/css">
</head>
<body>
    <div class="container">
        <div class="jumbotron">
            <h1 class="text-center">My Team</h1>
            
        </div>
        <div class= "card-container">
        `
        completeHtml.push(startingHtml);

       for (let i = 0; i < completeTeam.length; i++) {

           let object = `
        <div class="member-card">
            <div class="card-top">
                <h2>${completeTeam[i].name}</h2>
                <h2>${completeTeam[i].title}</h2>
            </div>
            <div class="card-bottom">
                <p>Employee ID: ${completeTeam[i].id}</p>
                <p>Email: <a href="mailto:${completeTeam[i].email}">${completeTeam[i].email}</a></p>
        `
        if (completeTeam[i].officeNumber) {
            object += `
            <p>${completeTeam[i].officeNumber}</p>
            `
        }
        if (completeTeam[i].github) {
            object += `
            <p>GitHub: <a href="https://github.com/${completeTeam[i].github}">${completeTeam[i].github}</a></p>
            `
        }
        if (completeTeam[i].school) {
            object += `
            <p>School: ${completeTeam[i].school}</p>
            `
        }
        object += `
        </div>
        </div>
        `
        completeHtml.push(object)
    

       }
       const endingHtml = `
       </div>
       </body>
       </html>`

       completeHtml.push(endingHtml);



       fs.writeFile(`./myteam-html/${completeTeam[0]}.html`, completeHtml.join(""), function(err){

       })

    
        
    }

addManager()