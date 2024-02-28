const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const YOUR_BOT_TOKEN = ''; // Replace with your bot token
const YOUR_VOICE_CHANNEL_ID = ''; // Replace with your voice channel ID
const SAFE_CHANNEL_ID = ''; // Replace with your safe channel ID

client.once('ready', () => {
  console.log('Bot is ready!');
  joinVoiceChannel();
});

client.on('voiceStateUpdate', (oldState, newState) => {
  if (newState.channelId === YOUR_VOICE_CHANNEL_ID && newState.member.id !== client.user.id) {
    // Your existing code to move the user and send a DM
    moveUserAndSendGif(newState);
  } else if (newState.channel && newState.channel.name.toLowerCase().includes('') && newState.member.id !== client.user.id) {
    // New code to move the user if they join a channel with '' in its name
    moveUserAndSendGif(newState);
  }
});

function moveUserAndSendGif(memberState) {
  memberState.setChannel(SAFE_CHANNEL_ID)
    .then(() => {
      console.log(`Moved ${memberState.member.displayName}.`);
      // Send a DM with a GIF
      memberState.member.send({
        content: "I deem you unworthy.",
        files: ['https://media1.tenor.com/m/jpaE44SWbdAAAAAC/heroes-of-the-storm-diablo.gif'] // Direct link to your GIF
      })
      .then(message => console.log(`Sent a message to ${memberState.member.displayName}`))
      .catch(console.error);
    })
    .catch(console.error);
}

function joinVoiceChannel() {
  client.channels.fetch(YOUR_VOICE_CHANNEL_ID)
    .then(channel => {
      // Assuming this is a voice channel, if not, this will not work as expected
      if(channel.type === 'GUILD_VOICE') {
        return channel.join();
      } else {
        throw new Error('Not a voice channel.');
      }
    })
    .catch(console.error);
}

client.login(YOUR_BOT_TOKEN);

//new change adding to personal git hub
//Stevie binder2024
