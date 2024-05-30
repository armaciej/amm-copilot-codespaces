function skillsMember() {
    let member = {
        name: "John Doe",
        age: 30,
        skills: ["HTML", "CSS", "JavaScript"],
        showSkills: function () {
            this.skills.map((skill) => console.log(skill));
        }
    };
    return member;
}