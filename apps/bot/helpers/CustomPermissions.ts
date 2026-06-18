export class CustomPermissions {
  static get generalPermissions(): readonly string[] {
    return [
      "CreateInstantInvite",
      "AddReactions",
      "Stream",
      "ViewChannel",
      "SendMessages",
      "EmbedLinks",
      "AttachFiles",
      "ReadMessageHistory",
      "UseExternalEmojis",
      "Connect",
      "Speak",
      "ChangeNickname",
      "UseApplicationCommands",
      "RequestToSpeak",
      "CreatePublicThreads",
      "CreatePrivateThreads",
      "UseExternalStickers",
      "SendMessagesInThreads",
      "UseEmbeddedActivities",
      "UseSoundboard",
      "CreateGuildExpressions",
      "CreateEvents",
      "UseExternalSounds",
      "SendVoiceMessages",
      "SendPolls",
      "UseExternalApps",
    ];
  }

  static get allPermissions(): readonly string[] {
    return this.generalPermissions.concat([
      "ModerateMembers",
      "ViewCreatorMonetizationAnalytics",
      "ManageEvents",
      "ManageThreads",
      "ManageNicknames",
      "ManageRoles",
      "ManageWebhooks",
      "ManageGuildExpressions",
      "MuteMembers",
      "DeafenMembers",
      "MoveMembers",
      "ViewGuildInsights",
      "MentionEveryone",
      "ManageMessages",
      "ViewAuditLog",
      "KickMembers",
      "BanMembers",
      "Administrator",
      "ManageGuild",
    ]);
  }
}
