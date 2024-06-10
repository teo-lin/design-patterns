export enum Channel {
  Email = 'email',
  Sms = 'sms',
  Push = 'push_notification',
  InApp = 'in_app_notification',
  Phone = 'phone_call',
  Telegram = 'telegram',
  WhatsApp = 'whatsapp',
  Slack = 'slack',
  Discord = 'discord',
  Facebook = 'facebook_messenger',
  Twitter = 'twitter_dm',
  LinkedIn = 'linkedin_message',
  Skype = 'skype',
  Viber = 'viber',
  WeChat = 'wechat',
  Line = 'line',
  Signal = 'signal',
  Snapchat = 'snapchat',
  Instagram = 'instagram_dm',
  Weibo = 'weibo',
  Qq = 'qq',
}

export enum AlertStatus {
    Draft = 'draft',
    Sent = 'sent',
    Read = 'read',
    Resent = 'resent',
    Failed = 'failed',
    Rejected = 'rejected',
}

type CommonStatus = 'none' | 'deleted' | 'archived'
export type WorkStatus = CommonStatus | 'planned' | 'assigned' | 'started' | 'drafted' | 'reviewed' | 'completed'
export type HomeStatus = CommonStatus | 'planned' | 'started' | 'completed'
export type ShopStatus = CommonStatus | 'wishlisted' | 'purchased' | 'rejected' | 'postponed' | 'ordered'
export type TaskStatus = WorkStatus | HomeStatus | ShopStatus

// ...etc (suggestions for custom user-defined categories)
export enum Category {
  Work = 'work',
  Home = 'home',
  Play = 'play',
  Shop = 'shop',
  Body = 'body',
  Mind = 'mind',
  Soul = 'soul',
  Trip = 'trip',
  Life = 'life',
}