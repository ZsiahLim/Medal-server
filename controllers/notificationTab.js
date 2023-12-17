import NotificationTab from '../models/NotificationTab.js'
import User from '../models/Users.js'

export const setNotificationTab = async (req, res, next) => {
    console.log("qingqiule");
    try {
        const userID = req.user.id
        const userNotificationTab = await NotificationTab.findOne({ user: userID })
        let updatedNotificationTab;
        if (!userNotificationTab) {
            const newUserNotificationTab = new NotificationTab({ ...req.body, user: userID })
            updatedNotificationTab = await newUserNotificationTab.save();
            const user = await User.findByIdAndUpdate(userID, { notificationTab: updatedNotificationTab._id });
        } else {
            updatedNotificationTab = await NotificationTab.findOneAndUpdate({ user: userID }, { ...req.body })
        }
        res.status(200).json(updatedNotificationTab);
    } catch (err) {
        next(err)
    }
}