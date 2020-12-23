const stateWeather = {
    isLoading: true,
    isSearchLoading: false,
    city: '',
    nhietDo: '30',
    tinhHinh: '',
    icon: '',
    doK: '',
    tomorow: [
        {
            time: '',
            nhietDo: '',
            doK: '',
            icon: ''
        }
    ],
    warning: {
        isWarning: false,
        message: [],
        icon: 'http://openweathermap.org/img/wn/10n@4x.png',
    }
}

const getTomorow = () => {
    var today = new Date();
    today.setDate(new Date().getDate() + 1);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

const dataWeather = [
    ['thunderstorm with light rain', 'Giông bão có mưa nhẹ'],
    ['thunderstorm with rain', 'Giông bão có mưa'],
    ['thunderstorm with heavy rain', 'Giông bão có mưa lớn'],
    ['light thunderstorm', 'Giông bão nhẹ'],
    ['thunderstorm', 'Giông'],
    ['heavy thunderstorm', 'Giông bão lớn'],
    ['ragged thunderstorm', 'Giông bão'],
    ['thunderstorm with light drizzle', 'Giông bão có mưa phùn nhẹ'],
    ['thunderstorm with drizzle', 'Giông bão có mưa phùn'],
    ['thunderstorm with heavy drizzle', 'Giông bão có mưa phùn lớn'],
    ['light intensity drizzle', 'Cường độ nhẹ mưa phùn'],
    ['drizzle', 'Mưa phùn'],
    ['heavy intensity drizzle', 'Cường độ nặng mưa phùn'],
    ['light intensity drizzle rain', 'Cường độ nhẹ mưa phùn'],
    ['drizzle rain', 'Mưa phùn'],
    ['heavy intensity drizzle rain', 'Mưa phùn cường độ lớn'],
    ['shower rain and drizzle', 'Mưa rào và mưa phùn'],
    ['heavy shower rain and drizzle', 'Mưa rào và mưa phùn'],
    ['shower drizzle', 'Mưa phùn tắm'],
    ['light rain', 'Mưa nhỏ'],
    ['moderate rain', 'Mưa vừa'],
    ['heavy intensity rain', 'Mưa lớn'],
    ['very heavy rain', 'Mưa rất lớn'],
    ['extreme rain', 'Mưa cực lớn'],
    ['freezing rain', 'Mưa lạnh'],
    ['light intensity shower rain', 'Cường độ nhẹ mưa rào'],
    ['shower rain', 'Mưa'],
    ['heavy intensity shower rain', 'Mưa rào cường độ lớn'],
    ['ragged shower rain', 'Mưa rào'],
    ['light snow', 'Tuyết nhẹ'],
    ['Snow', 'Tuyết'],
    ['Heavy snow', 'Tuyết rơi nhiều'],
    ['Sleet', 'Tuyết'],
    ['Light shower sleet', 'Mưa rào nhẹ'],
    ['Shower sleet', 'Mưa rào'],
    ['Light rain and snow', 'Mưa nhẹ và tuyết'],
    ['Rain and snow', 'Mưa và tuyết'],
    ['Light shower snow', 'Mưa tuyết nhẹ'],
    ['Shower snow', 'Tuyết'],
    ['Heavy shower snow', 'Mưa tuyết lớn'],
    ['mist', 'Sương mù'],
    ['Smoke', 'Khói'],
    ['Haze', 'Sương mù'],
    ['sand/ dust whirls', 'Bụi xoáy'],
    ['fog', 'Sương mù'],
    ['sand', 'Cát'],
    ['dust', 'Bụi băm'],
    ['volcanic ash', 'Tro núi lửa'],
    ['squalls', 'mưa đá'],
    ['tornado', 'Lốc xoáy'],
    ['clear sky', 'Bầu trời quang đãng'],
    ['few clouds', 'Ít mây'],
    ['scattered clouds', 'Mây rải rác'],
    ['broken clouds', 'Mây tan'],
    ['overcast clouds', 'Mây u ám']
]



export const WeatherReducer = (state = stateWeather, action) => {

    switch (action.type) {
        case 'GET_WEATHER': {
            const list = action.tomorow.list;
            const tomorow = getTomorow();
            let arr = [];

            let arrMessage = [];
            for (const item of list) {
                if ((item.dt_txt === tomorow + " 00:00:00") || (item.dt_txt === tomorow + " 06:00:00") || (item.dt_txt === tomorow + " 12:00:00") || (item.dt_txt === tomorow + " 18:00:00")) {
                    const data = {
                        time: item.dt_txt.substr(11, 5),
                        nhietDo: Math.round(item.main.temp - 273.15) + "°C",
                        doK: Math.round(item.main.temp * 9 / 5 - 459.67) + "°F",
                        icon: "http://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png"
                    }
                    arr.push(data);

                    if (item.weather[0].main === 'Rain') {
                        arrMessage.push('Thời tiết ngày mai có thể sẽ mưa. Nhớ cẩn thận nhé!');
                        state.warning.icon = 'http://openweathermap.org/img/wn/09d@2x.png';
                    }
                    if (item.weather[0].main === 'Drizzle') {
                        arrMessage.push('Thời tiết ngày mai có thể có mưa phùn!');
                        state.warning.icon = 'http://openweathermap.org/img/wn/09d@2x.png';
                    }
                    if (item.weather[0].main === 'Thunderstorm') {
                        arrMessage.push('Ngày mai sẽ có bão. Xin hay cẩn thận khi ra đường!');
                        state.warning.icon = 'http://openweathermap.org/img/wn/11d@2x.png';
                    }
                    if (item.weather[0].main === 'Snow') {
                        arrMessage.push('Ngày mai sẽ có tuyết. Hãy mang áo lạnh khi ra ngoài!');
                        state.warning.icon = 'http://openweathermap.org/img/wn/13d@2x.png';
                    }
                }
            }

            // SET THONG BAO THOI TIET VAO STATE
            arrMessage = Array.from(new Set(arrMessage));
            if (arrMessage.length > 0) {
                state.warning.isWarning = true;
                state.warning.message = arrMessage;
            } else {
                state.warning.isWarning = false;
                state.warning.message = [];
            }

            state.city = action.today.name;
            state.nhietDo = Math.round(action.today.main.temp - 273.15) + "°C";
            state.doK = Math.round(action.today.main.temp * 9 / 5 - 459.67) + "°F";
            state.icon = "http://openweathermap.org/img/wn/" + action.today.weather[0].icon + "@4x.png";

            state.tinhHinh = 'Chưa xác định được';
            for (const item of dataWeather) {
                if (item[0] === action.today.weather[0].description) {
                    state.tinhHinh = item[1];
                }
            }

            state.tomorow = arr;

            return { ...state }
        }
        case 'ENABLE_LOADING': {
            state.isLoading = true;
            return { ...state }
        }
        case 'DISABLE_LOADING': {
            state.isLoading = false;
            return { ...state }
        }
        case 'ENABLE_SEARCH_LOADING': {
            state.isSearchLoading = true;
            return { ...state }
        }
        case 'DISABLE_SEARCH_LOADING': {
            state.isSearchLoading = false;
            return { ...state }
        }
        case 'CLOSE_WARNING': {
            state.warning.isWarning = false;
            state.warning.message = [];
            return { ...state };
        }
        default: {
            return { ...state }
        }
    }

}