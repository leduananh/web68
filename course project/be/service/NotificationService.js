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

NotificationService.loadNotificationForUser = async (receivedUserId, dateFilter = 7, isRead = false) => {
    const currentDate = new Date()
    const filterDate = currentDate.setDate(currentDate.getDate() - dateFilter);

    return await Notification.find(
        {
            receivedUserId,
            createdAt: { $gte: filterDate },
            isRead
        }
    ).sort({ createdAt: -1 });
}

NotificationService.readNotificationById = async (notificationId) => {

    return await Notification.findOneAndUpdate(
        {
            _id: notificationId
        },
        {
            $set: { isRead: true }
        },
        {
            new: true
        }
    );
}

module.exports = NotificationService