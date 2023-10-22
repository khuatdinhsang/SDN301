export const formatTimestamp = (timestamp) =>{
    // Chuyển đổi timestamp thành đối tượng Date
    const date = new Date(timestamp);
  
    // Định dạng thời gian thành một chuỗi hiển thị
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
  }