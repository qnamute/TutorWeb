var message = {
    getMessageStatus: function (hasSeen) {
        if (hasSeen == 0) {
            // Not seen
            return '<span class="badge bg-green">Chưa xem</span>'
        }
        if (hasSeen == 1) {
            // Seen
            '<span class="badge bg-info">Đã xem</span>'
        }
        else (hasSeen == 2) {
            // Replied
            '<span class="badge bg-light">Đã phản hồi</span>'
        }
    } 
}