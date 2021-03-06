export const initTheory = () => {
    const chaptersBlock = document.getElementById("chapters");
    const chapters = ["1. Общие понятия", "3. Применение специальных сигналов", "5. Обязанности пассажиров", "7. Применение аварийной сигнализации и знака аварийной остановки", "9. Расположение транспортных средств и проезжей части", "11. Обгон, опережение, встречный разъезд", "13. Проезд перекрестков", "15. Движение через железнодорожные пути", "17. Движение в жилых зонах", "19. Пользование внешними световыми приборами и звуковыми сигналами", "21. Учебная езда", "23. Перевозка грузов", "25. Дополнительные требования к движению грузовых повозок и прогону животных", "2. Общие обязанности водителей", "4. Обязанности пешеходов", "6. Сигналы светофора и регулировщика", "8. Начало движения, маневрирование", "10. Скорость движения", "12. Остановка и стоянка", "14. Пешеходные переходы и места остановок маршрутных транспортных средств", "16. Движение по автомагистралям", "18. Приоритет маршрутных транспортных средств", "20. Буксировка механических транспортных средств", "22. Перевозка людей", "24. Дополнительные требования кдвижению велосипедистов и мопедов", "26. Нормы времени управления транспортным средством и отдыха"];
    for (let chapter of (chapters.sort((a, b) => {
        const aNum = parseInt(a.split(' ')[0]);
        const bNum = parseInt(b.split(' ')[0]);
        return aNum - bNum;
    }))) {
        chaptersBlock.innerHTML += `<div class="topics"><a class="topic">${chapter}</a></div>`;
    }
}

