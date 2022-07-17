const axios = require('axios');


function getGitHistory(git_name) {
    return axios.get('https://api.github.com/users/' + git_name + '/events')
}

async function getData(){

    let event_list = await getGitHistory(process.env.GIT_NICKNAME);

    if (event_list.status === 200){

        return event_list.data.filter((value, index) => {

            let today = new Date(Date.now());
            let today_month = today.getMonth() + 1;
            let today_date = today.getDate();

            let event_day = new Date(Date.parse(value['created_at']));
            let event_month = event_day.getMonth() + 1;
            let event_date = event_day.getDate();

            return (value['type'] === 'PushEvent'
                && today_month === event_month
                && today_date === event_date)
        });

    }else{
        return null;
    }
}

module.exports = getData();