const Notification = require("../model/Notification")

const NotificationService = {}

NotificationService.createNotification = async (title, content, type, receivedUserIds) => {

    const notificationList = receivedUserIds.map(receivedUserId => ({
        title,
        content,
        type,
        receivedUserId
    }))

    await Notification.insertMany(notificationList);
}

NotificationService.loadNotificationForUser = async (receivedUserId) => {
    return await Notification.find(
        { receivedUserId }
    );
}

module.exports = NotificationService