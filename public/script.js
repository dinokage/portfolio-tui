$('body').terminal({ 
    whoami: function () { 
        this.echo('guest'); 
    }, 
    pwd: function() {
        this.echo("/home/dinokage")
    },
    founder: function () { 
        this.echo('Dinokage'); 
    }, 
    projects: async function() {
        const projects = await fetch("http://192.168.0.112:3000/projects").then( response => response.json())
        this.echo("Here is a list of my projects\n" + "//TODO add projects (build an API to fetch projects)")
        jQuery.each(projects, (index, value)=> {
            this.echo(`${value["name"]} - ${value["url"]}`)
        })
        // this.echo(projects)
    },
    help: function () { 
        this.echo("help - print this message\n" +
        "whoami - prints username\n" + 
        "pwd - show current directory\n" +
        "projects - get a list of my projects\n" +
        "hostname - show current host\n" + 
        "banner - show ASCII art :P");  
    },
    hostname: function() {
        this.echo("dinokage.github.io")
    }, 
    banner: function() {
        this.echo(ascii.innerHTML)
    },
}, { 
    greetings: ascii.innerHTML,
    prompt: "guest@dinokage.github.io $ "
}); 