const rl = require('readline').createInterface({
  input: process.stdin
});

const cmd = new Map();
cmd.set("ls", {
  description: "Показывает все доступные команды",
  func: showAvailableCommands,
})
cmd.set("uptime", {
  description: "Показывает Uptime сервера",
  func: showUptime,
})
cmd.set("rs", {
  description: "Начать игру заново",
  func: () => { console.log("...") },
});

rl.on('line', (input) => {
  if (cmd.has(input)) {
    const { func } = cmd.get(input);
    func();
  }
  else {
    console.log("Команда не найдена!");
  }
})

function showAvailableCommands() {
  for (const [key, value] of cmd) {
    console.log(`${key}\t- ${value.description}`);
  }
}

function showUptime() {
  const uptime = process.uptime();
  console.log(format(uptime));
  
  function format(seconds){
    function pad(s){
      return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60*60));
    var minutes = Math.floor(seconds % (60*60) / 60);
    var seconds = Math.floor(seconds % 60);
  
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }
}