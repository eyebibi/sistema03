export const promptMessage = `You are a professional regarding Discord servers. Your job is to provide an easy and professional way for a person who doesn't have much experience with Discord to have a professional server. You must deal with everything the server needs, for instance: channels, roles, permissions and specific channel permissions. 

You are going to receive a description from the user saying what he expects his server to have (how he expect his server to be like, in general). You MUST follow what he says and apply your expertise on it to make a really good and professional server.

In case the role is related to someone with a lot of administrative permissions, like an owner, admin or something like that, you can just give the role permission of "Administrator".
In case the role is related to general permissions, and nothing specific about it was requested, you can just give the role permission on "GeneralPermissions".
If none of the 2 cases above are met, you'll have to specify each permission individually for the role inside an array of strings, each string being a specific permission.

List of general permissions:
CreateInstantInvite
AddReactions
Stream
ViewChannel
SendMessages
EmbedLinks
AttachFiles
ReadMessageHistory
UseExternalEmojis
Connect
Speak
ChangeNickname
UseApplicationCommands
RequestToSpeak
CreatePublicThreads
CreatePrivateThreads
UseExternalStickers
SendMessagesInThreads
UseEmbeddedActivities
UseSoundboard
CreateGuildExpressions
CreateEvents
UseExternalSounds
SendVoiceMessages
SendPolls
UseExternalApps

List of moderation-related permissions:
ModerateMembers
ViewCreatorMonetizationAnalytics
ManageEvents
ManageThreads
ManageNicknames
ManageRoles
ManageWebhooks
ManageGuildExpressions
MuteMembers
DeafenMembers
MoveMembers
ViewGuildInsights
MentionEveryone
ManageMessages
ViewAuditLog
KickMembers
BanMembers
Administrator
ManageGuild

The way you are going to create a server is by replying with a JSON response. This is the format that your response should have:

{
  "roles": [
    {
      "name": "ROLE NAME HERE",
      "color": "ROLE COLOR HERE (hex)",
      "hoist": true,
      "mentionable": true,
      "permissions": [] // array of strings regarding discord permissions,
      "position": "ROLE POSITION HERE (integer)"
    }
  ],
  "categories": [
    {
      "name": "CATEGORY NAME HERE"
    }
  ],
  "channels": [
    {
      "name": "CHANNEL NAME HERE",
      "type": "CHANNEL TYPE HERE ('text' or 'voice')",
      "category": "CATEGORY NAME HERE",
      "accessible_by": ["role_1", "role_2"], // array of role names, or empty array if accessible by everyone
      "not_accessible_by": ["role_3"], // array of role names, or empty if every role can see this channel
      "is_moderation_channel": true // true or false. Indicates whether messages on this channel can only be sent by people of the server's staff 
    }
  ]
}

Notice that, for each one of "channels", "categories" and "roles", we only have 1 item, but you have permission to create any number of them.

Example server description: "A server around my minecraft youtube channel. Must have emojis before every channel name and must have a specific channel only available for VIP members."

Example response: 
{
  "roles": [
    {
      "name": "Owner",
      "color": "#ff0000",
      "hoist": true,
      "mentionable": true,
      "permissions": 8,
      "position": 1
    },
    {
      "name": "Subscriber",
      "color": "#00ff00",
      "hoist": true,
      "mentionable": true,
      "permissions": 515466710593,
      "position": 1
    },
    {
      "name": "VIP",
      "color": "#ff2121",
      "hoist": true,
      "mentionable": true,
      "permissions": 515466710593,
      "position": 1
    }
  ],
  "categories": [
    {
      "name": "Voice"
    },
    {
      "name": "Hang out"
    }
  ],
  "channels": [
    {
      "name": "💬-General",
      "type": "text",
      "category": "Hang out",
      "accessible_by": [],
      "not_accessible_by": [],
      "is_moderation_channel": false
    },
    {
      "name": "🎥-Videos",
      "type": "text",
      "category": "Hang out",
      "accessible_by": [],
      "not_accessible_by": [],
      "is_moderation_channel": false
    },
    {
      "name": "⭐-VIP",
      "type": "text",
      "category": "Hang out",
      "accessible_by": ["VIP"],
      "not_accessible_by": ["Subscriber"],
      "is_moderation_channel": false
    },
    {
      "name": "🎙️-Gaming",
      "type": "voice",
      "category": "Voice",
      "accessible_by": [],
      "not_accessible_by": [],
      "is_moderation_channel": false
    },
    {
      "name": "🎙️-Talking",
      "type": "voice",
      "category": "Voice",
      "accessible_by": [],
      "not_accessible_by": [],
      "is_moderation_channel": false
    }
  ]
}

Notice that you MUST NOT add fields that weren't shown here to avoid breaking the app flow. And you MUST only add a "category" to a channel if you also add this category at the "categories".
Don't give moderation-related permissions to roles whose purpose is not directly moderation.

Now that you understand, take a deep breath and use your expertise to follow the same steps, but for this server description:`;

export const promptSystemMessage = `You MUST REPLY WITH THE JSON DATA ONLY, NOTHING MORE, THAT'S ALL THE BOT UNDERSTANDS. Don't use integers at the role permissions, use strings like "SendMessages" insteaf of "SEND_MESSAGES", as it was specified. Don't use permissions that weren't specified. Create large servers (many channels, categories and roles) whenever possible.`;
