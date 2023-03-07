let manager = {
    
    name: 'Darcy',
    salesTeam: [
        { name: 'Alice', quota: '500'},
        { name: 'Bob', quota: '240'},
        { name: 'Charlie', quota: '10'},
    ],
    district: {
        name: 'ATX',
        offices: 10,
        remote: true
    }
}

let managerName = manager.name;
let totalQuota = `Total quota: ${parseInt(manager.salesTeam[0].quota) + parseInt(manager.salesTeam[1].quota) + parseInt(manager.salesTeam[2].quota)}`;
let salesTeamName = manager.district.name + ' Sales Team';
let salesTeamMembers = [manager.salesTeam[0].name, manager.salesTeam[1].name, manager.salesTeam[2].name];


function htmlFromManager(obj) {
const div = document.createElement("div")
const h1 = document.createElement("h1")
const h2 = document.createElement("h2")
const h3 = document.createElement("h3")
const ul = document.createElement("ul")

div.className = 'district-sales'
h1.className = 'manager'
h2.className = 'total-quota'
h3.className = 'team-name'
ul.className = 'team-members'  

div.append(h1,h2,h3,ul)  
h1.append(managerName)
h2.append(totalQuota)
h3.append(salesTeamName)


for (let i = 0; i < salesTeamMembers.length; i++) {
    const li = document.createElement("li")
    ul.append(li)
    li.append(salesTeamMembers[i])
    }
    return div;
}
    
console.log(htmlFromManager(manager))