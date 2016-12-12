var TelegramBot = require('node-telegram-bot-api');
var Twitter = require('twitter');

var token = 'xxxxxxxxxxxxxxxxxxxxx';
var client = new Twitter({
  consumer_key: 'xxxxxxxxxxxxxxxxxx',
  consumer_secret: 'xxxxxxxxxxxxxxxxxx',
  access_token_key: 'xxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxx',
  access_token_secret: 'xxxxxxxxxxxxxxxxxx'
});

var bot = new TelegramBot(token, {polling: true});


  client.stream('user', function(stream) {
    stream.on('data', function(tweet) {
      if(tweet.user && tweet.user.screen_name === 'SiberPau') {
        var twiturl = 'https://twitter.com/'+ tweet.user.screen_name +'/status/'+ tweet.id_str;
        bot.sendMessage('-160694451', twiturl);
      }
    });

    stream.on('error', function(error) {
      console.log(error);
    });
  });

//
// Uyudun mu :) hergün bu saatlerde
// setInterval(function() {
//   var date = new Date();
//   var current_hour = date.getHours();
//   var min  = date.getMinutes();
//   // console.log(min);
//   if(current_hour == 23 && min < 30 )
//     bot.sendMessage('-160694451', 'Uyudunuz mu ?');
// } ,  1000 * 60 * 30);

// // Any kind of message
bot.on('message', function (msg) {
  console.log(msg);
  var chatId = msg.chat.id;
  var text = msg.text;

  // join the new user
  if(msg.new_chat_participant) {
    if(msg.new_chat_participant.username)
      var username = msg.new_chat_participant.username;
    else
      var username = msg.new_chat_participant.first_name;
      bot.sendMessage(chatId, 'Hoşgeldin @'+ username +' 😀', { reply_to_message_id:msg.message_id });
      bot.sendSticker(chatId, 'BQADBAADOQAD8zXrCJoSljz5UUqMAg');
  }
  // left the user
  else if(msg.left_chat_participant) {
    if(msg.left_chat_participant.username)
      var username = msg.left_chat_participant.username;
    else
      var username = msg.left_chat_participant.first_name;
    bot.sendMessage(chatId, 'Gule Gule @'+ username +' 😀', { reply_to_message_id:msg.message_id });
    bot.sendSticker(chatId, 'BQADBAADcAADlanpAaQiSNNck43uAg');
  }
  else if(!msg.entities) {
    // konuşmalara salça olalım :)
    if(text.indexOf('selam') >= 0 || text.indexOf('slm') >= 0) {
      bot.sendMessage(chatId, 'slm nbr ?', { disable_notification:true, reply_to_message_id:msg.message_id } );
    }
     if (text.indexOf('iyi geceler') >= 0) {
      bot.sendMessage(chatId, 'Sahiden iyi mi geceler ?', { disable_notification:true, reply_to_message_id:msg.message_id } );
    }
     if (text.indexOf('merhaba') >= 0 || text.indexOf('mrb') >= 0 || text.indexOf('meraba') >= 0) {
      // meraba yazanda varmış :S :)
      bot.sendMessage(chatId, 'merhabana merhaba kardeş !', { disable_notification:true, reply_to_message_id:msg.message_id } );
    }
     if (text.indexOf('iyilik') >= 0 || text.indexOf('iyidir') >= 0 || text.indexOf('iyiyim') >= 0) {
      bot.sendMessage(chatId, 'Ne güzel. Daha iyi ve güzel günler senin olsun dostum 🤗', { disable_notification:true, reply_to_message_id:msg.message_id } );
    }
     if (text.indexOf('nasılsın') >= 0 || text.indexOf('naber') >= 0 || text.indexOf('nbr') >= 0 ) {
      bot.sendMessage(chatId, 'Vay benim canım ya hali mi hatrımıda soruyor 😘', { disable_notification:true, reply_to_message_id:msg.message_id } );
      bot.sendMessage(chatId, 'Şuan çok iyi oldum sen nasılsın ? ', { disable_notification:true, reply_to_message_id:msg.message_id } );
    }
     if (text.indexOf('sus') >= 0) {
      bot.sendMessage(chatId, 'Tmm', { disable_notification:true, reply_to_message_id:msg.message_id } );
    }
     if(text.indexOf('bot') >= 0 ) {
      bot.sendMessage(chatId, 'Efendim canısı, bana mı seslendin ?', { disable_notification:true, reply_to_message_id:msg.message_id } );
    }

  }
  else {
     if(msg.entities && msg.entities[0].type === 'bot_command') {
      var fromUserName = msg.from.username;

      if(text === '/site' || text === '/site@pausiberbot' ) {
        bot.sendMessage(chatId, 'https://pausiber.xyz', { disable_notification:true, reply_to_message_id:msg.message_id } );
      }
      else if(text === '/facebook' || text === '/facebook@pausiberbot' ) {
        bot.sendMessage(chatId, 'https://www.facebook.com/pausiber', { disable_notification:true, reply_to_message_id:msg.message_id });
      }
      else if(text === '/twitter' || text === '/twitter@pausiberbot' ) {
        bot.sendMessage(chatId, 'https://twitter.com/siberpau', { disable_notification:true, reply_to_message_id:msg.message_id });
      }
      else if(text === '/github' || text === '/github@pausiberbot' ) {
        bot.sendMessage(chatId, 'https://github.com/PauSiber', { disable_notification:true, reply_to_message_id:msg.message_id });
      }
      else if(text === '/start' || text === '/start@pausiberbot') {
        bot.sendMessage(chatId, 'Hadi hadi hadi :)', { disable_notification:true, reply_to_message_id:msg.message_id });
      }
      else {
        bot.sendMessage(chatId, 'Sen dedin ama ne dedin, ben bilemedim, kendime gelemedim 😕', { disable_notification:true, reply_to_message_id:msg.message_id });
      }
    }
  }


});
