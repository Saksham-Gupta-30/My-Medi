const currentTimestamp = () => {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    // console.log(formattedDateTime); // Output: e.g., "02/10/2023 13:43"
    return formattedDateTime;
}

export { currentTimestamp }