document.addEventListener('DOMContentLoaded', () => {
    const resultInput = document.getElementById('result');
    if (!resultInput) {
        console.error('Ошибка: элемент result не найден');
        return;
    }

    // Цифровые кнопки
    const digitBtns = document.querySelectorAll('[id^="btn_digit_"]');
    // Операции
    const opClear = document.getElementById('btn_op_clear');
    const opSign = document.getElementById('btn_op_sign');
    const opPercent = document.getElementById('btn_op_percent');
    const opDiv = document.getElementById('btn_op_div');
    const opMult = document.getElementById('btn_op_mult');
    const opMinus = document.getElementById('btn_op_minus');
    const opPlus = document.getElementById('btn_op_plus');
    const opEqual = document.getElementById('btn_op_equal');
    const dotBtn = document.getElementById('btn_digit_dot');
    // Дополнительные кнопки
    const backspaceBtn = document.getElementById('btn_backspace');
    const sqrtBtn = document.getElementById('btn_sqrt');
    const squareBtn = document.getElementById('btn_square');
    const factorialBtn = document.getElementById('btn_factorial');
    const btn000 = document.getElementById('btn_000');
    const mcBtn = document.getElementById('btn_mc');
    const mrBtn = document.getElementById('btn_mr');
    const mplusBtn = document.getElementById('btn_mplus');
    const mminusBtn = document.getElementById('btn_mminus');
    // История
    const historyToggle = document.getElementById('historyToggle');
    const historyPanel = document.getElementById('historyPanel');
    const historyList = document.getElementById('historyList');

    let history = [];
    try {
        const saved = localStorage.getItem('calculatorHistory');
        if (saved) {
            history = JSON.parse(saved);
            if (!Array.isArray(history)) history = [];
        }
    } catch (e) {
        console.warn('Ошибка загрузки истории из localStorage:', e);
    }

    // ========== СОСТОЯНИЕ КАЛЬКУЛЯТОРА ==========
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetInput = false;
    let memory = 0;

    // Флаг для отслеживания, нужно ли показывать цветной текст
    let showColoredText = false;

    // ========== ФУНКЦИИ ДЛЯ РАБОТЫ С ЦВЕТОМ ТЕКСТА ==========
    function getColorFromNumber(num) {
        // Преобразуем число в HEX строку (без знака)
        let hexValue = Math.abs(Math.floor(num)).toString(16).toUpperCase();

        // Если HEX значение слишком длинное, берем первые 6 символов
        let hexColor = hexValue.slice(0, 6);

        // Если HEX слишком короткое, дополняем нулями
        while (hexColor.length < 6) {
            hexColor = '0' + hexColor;
        }

        // Добавляем символ # для CSS цвета
        const colorCode = '#' + hexColor;

        return {
            hex: hexValue,
            color: colorCode
        };
    }

    function updateDisplayWithColor(value) {
        resultInput.value = value;

        // Если включен цветной режим и это не ошибка
        if (showColoredText && value !== 'Error') {
            let number = parseFloat(value);

            if (!isNaN(number)) {
                // Получаем цвет на основе числа
                const colorInfo = getColorFromNumber(number);

                // Устанавливаем цвет ТЕКСТА на основе числа
                resultInput.style.color = colorInfo.color;

                // Добавляем атрибут с HEX значением для отладки
                resultInput.setAttribute('data-hex', colorInfo.hex);
            } else {
                // Если число некорректное, белый текст
                resultInput.style.color = 'white';
            }
        } else {
            // Обычный режим - белый текст
            resultInput.style.color = 'white';
        }

        // Фон всегда синий
        resultInput.style.backgroundColor = '#00264d';

        adjustFontSize(value);
    }

    // Функция для сброса цветного режима
    function resetColorMode() {
        showColoredText = false;
        resultInput.style.color = 'white';
    }

    // ========== ФУНКЦИИ ОТОБРАЖЕНИЯ ==========
    function updateDisplay(value) {
        updateDisplayWithColor(value);
    }

    function adjustFontSize(value) {
        const maxLen = 12;
        if (value.length > maxLen) {
            let newSize = 2 - (value.length - maxLen) * 0.1;
            newSize = Math.max(1, newSize);
            resultInput.style.fontSize = newSize + 'rem';
        } else {
            resultInput.style.fontSize = '2rem';
        }
    }

    // ========== ФУНКЦИИ ДЛЯ ИСТОРИИ ==========
    function addToHistory(entry) {
        if (!entry) return;

        // Добавляем информацию о цвете в историю, если есть результат
        if (entry.includes('=')) {
            const parts = entry.split('=');
            const result = parts[parts.length - 1].trim();
            const numResult = parseFloat(result);

            if (!isNaN(numResult)) {
                const colorInfo = getColorFromNumber(numResult);
                entry += ` [HEX: ${colorInfo.hex}]`;
            }
        }

        history.push(entry);
        if (history.length > 10) history.shift();

        try {
            localStorage.setItem('calculatorHistory', JSON.stringify(history));
            console.log('Сохранено в историю:', entry);
        } catch (e) {
            console.warn('Не удалось сохранить историю:', e);
        }

        renderHistory();
    }

    function renderHistory() {
        if (!historyList) {
            console.warn('Невозможно отобразить историю: элемент historyList отсутствует');
            return;
        }

        historyList.innerHTML = '';

        // Показываем последние 10 записей в обратном порядке (сначала новые)
        [...history].reverse().forEach(entry => {
            const item = document.createElement('div');
            item.classList.add('history-item');

            // Извлекаем HEX информацию для отображения
            let displayText = entry;
            let hexInfo = '';

            if (entry.includes('[HEX:')) {
                const hexMatch = entry.match(/\[HEX: ([A-F0-9]+)\]/);
                if (hexMatch) {
                    hexInfo = hexMatch[0];
                    displayText = entry.replace(hexInfo, '').trim();
                }
            }

            // Создаем контейнер для истории с цветовым акцентом
            const textSpan = document.createElement('span');
            textSpan.textContent = displayText;

            if (hexInfo) {
                const hexSpan = document.createElement('span');
                hexSpan.textContent = ' ' + hexInfo;
                hexSpan.style.fontSize = '0.7rem';
                hexSpan.style.opacity = '0.7';
                hexSpan.style.fontFamily = 'monospace';
                item.appendChild(textSpan);
                item.appendChild(hexSpan);
            } else {
                item.textContent = displayText;
            }

            // Добавляем цветной индикатор
            if (entry.includes('=')) {
                const parts = entry.split('=');
                const resultPart = parts[parts.length - 1].trim();
                // Убираем HEX информацию для парсинга
                const cleanResult = resultPart.replace(/\[HEX: [A-F0-9]+\]/, '').trim();
                const numResult = parseFloat(cleanResult);

                if (!isNaN(numResult)) {
                    const colorInfo = getColorFromNumber(numResult);
                    item.style.borderLeft = `4px solid ${colorInfo.color}`;

                    // Добавляем предпросмотр цвета при наведении
                    item.addEventListener('mouseenter', () => {
                        const originalColor = resultInput.style.color;
                        resultInput.style.color = colorInfo.color;
                        resultInput.setAttribute('data-preview', 'true');
                    });

                    item.addEventListener('mouseleave', () => {
                        if (resultInput.getAttribute('data-preview') === 'true') {
                            resultInput.style.color = showColoredText ? resultInput.style.color : 'white';
                            resultInput.removeAttribute('data-preview');
                        }
                    });
                }
            }

            item.addEventListener('click', () => {
                // Пытаемся извлечь результат из записи вида "выражение = результат"
                const parts = entry.split(' = ');
                if (parts.length > 1) {
                    // Очищаем от HEX информации
                    let resultCandidate = parts[parts.length - 1].trim();
                    resultCandidate = resultCandidate.replace(/\[HEX: [A-F0-9]+\]/, '').trim();

                    currentInput = resultCandidate;
                    previousInput = '';
                    operation = null;
                    resetInput = true;

                    // При клике на историю включаем цветной режим
                    showColoredText = true;
                    updateDisplay(currentInput);
                }
                historyPanel.classList.add('hidden');
            });

            historyList.appendChild(item);
        });
    }

    // ========== ОСНОВНЫЕ ОПЕРАЦИИ ==========
    function inputDigit(digit) {
        if (resetInput) {
            currentInput = digit;
            resetInput = false;
        } else {
            if (currentInput === '0' && digit !== '.') {
                currentInput = digit;
            } else {
                currentInput += digit;
            }
        }
        // Сбрасываем цветной режим при вводе цифр
        resetColorMode();
        updateDisplay(currentInput);
    }

    function inputDot() {
        if (resetInput) {
            currentInput = '0.';
            resetInput = false;
        } else {
            if (!currentInput.includes('.')) {
                currentInput += '.';
            }
        }
        // Сбрасываем цветной режим при вводе точки
        resetColorMode();
        updateDisplay(currentInput);
    }

    function clear() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        resetInput = false;
        // Сбрасываем цветной режим при очистке
        resetColorMode();
        updateDisplay(currentInput);
    }

    function toggleSign() {
        if (currentInput !== '0' && currentInput !== '' && currentInput !== 'Error') {
            const original = currentInput;
            if (currentInput.startsWith('-')) {
                currentInput = currentInput.slice(1);
            } else {
                currentInput = '-' + currentInput;
            }
            // Сбрасываем цветной режим при смене знака
            resetColorMode();
            updateDisplay(currentInput);
            addToHistory(`+/- (${original}) → ${currentInput}`);
        }
    }

    function percent() {
        if (currentInput === 'Error') return;
        const original = currentInput;
        const val = parseFloat(currentInput);
        if (!isNaN(val)) {
            currentInput = (val / 100).toString();
            // Сбрасываем цветной режим при проценте
            resetColorMode();
            updateDisplay(currentInput);
            addToHistory(`${original}% = ${currentInput}`);
        }
    }

    function setOperation(op) {
        if (operation !== null && !resetInput) {
            calculate();
        }
        previousInput = currentInput;
        operation = op;
        resetInput = true;
        // Сбрасываем цветной режим при выборе операции
        resetColorMode();
    }

    function calculate() {
        if (operation === null || resetInput) return;

        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(curr)) {
            currentInput = 'Error';
            operation = null;
            resetInput = true;
            // При ошибке не включаем цветной режим
            resetColorMode();
            updateDisplay(currentInput);
            return;
        }

        switch (operation) {
            case '+': result = prev + curr; break;
            case '-': result = prev - curr; break;
            case '*': result = prev * curr; break;
            case '/':
                if (curr === 0) {
                    result = 'Error';
                } else {
                    result = prev / curr;
                }
                break;
            default: return;
        }

        if (result === 'Error') {
            currentInput = 'Error';
            resetColorMode();
        } else {
            const expression = `${previousInput} ${operation} ${currentInput} = ${result}`;

            // Получаем HEX для результата
            const colorInfo = getColorFromNumber(result);

            addToHistory(expression);
            currentInput = result.toString();

            // ВКЛЮЧАЕМ цветной режим после вычисления
            showColoredText = true;
        }

        operation = null;
        resetInput = true;
        updateDisplay(currentInput);
    }

    // ========== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ==========
    function backspace() {
        if (currentInput === 'Error') return;
        const original = currentInput;
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        // Сбрасываем цветной режим при удалении
        resetColorMode();
        updateDisplay(currentInput);
        addToHistory(`⌫ (${original}) → ${currentInput}`);
    }

    function sqrt() {
        if (currentInput === 'Error') return;
        const original = currentInput;
        const val = parseFloat(currentInput);
        if (isNaN(val)) return;
        if (val < 0) {
            currentInput = 'Error';
            resetColorMode();
        } else {
            currentInput = Math.sqrt(val).toString();
            // Включаем цветной режим для результата
            showColoredText = true;
        }
        resetInput = true;
        updateDisplay(currentInput);
        addToHistory(`√(${original}) = ${currentInput}`);
    }

    function square() {
        if (currentInput === 'Error') return;
        const original = currentInput;
        const val = parseFloat(currentInput);
        if (isNaN(val)) return;
        currentInput = (val * val).toString();
        resetInput = true;
        // Включаем цветной режим для результата
        showColoredText = true;
        updateDisplay(currentInput);
        addToHistory(`(${original})² = ${currentInput}`);
    }

    function factorial() {
        if (currentInput === 'Error') return;
        const original = currentInput;
        const val = parseFloat(currentInput);
        if (isNaN(val) || !Number.isInteger(val) || val < 0 || val > 170) {
            currentInput = 'Error';
            resetColorMode();
        } else {
            let fact = 1;
            for (let i = 2; i <= val; i++) fact *= i;
            currentInput = fact.toString();
            // Включаем цветной режим для результата
            showColoredText = true;
        }
        resetInput = true;
        updateDisplay(currentInput);
        addToHistory(`${original}! = ${currentInput}`);
    }

    function add000() {
        if (currentInput === 'Error') return;
        const original = currentInput;
        if (currentInput === '0') {
            currentInput = '000';
        } else {
            currentInput += '000';
        }
        resetInput = false;
        // Сбрасываем цветной режим при добавлении 000
        resetColorMode();
        updateDisplay(currentInput);
        addToHistory(`${original} + 000 → ${currentInput}`);
    }

    // ========== ПАМЯТЬ ==========
    function memoryClear() {
        memory = 0;
        addToHistory('MC → M = 0');
    }

    function memoryRecall() {
        currentInput = memory.toString();
        resetInput = true;
        // Включаем цветной режим при вызове из памяти
        showColoredText = true;
        updateDisplay(currentInput);
        addToHistory(`MR = ${currentInput}`);
    }

    function memoryAdd() {
        const val = parseFloat(currentInput);
        if (!isNaN(val)) {
            memory += val;
            addToHistory(`M+ (${currentInput}) → M = ${memory}`);
        }
    }

    function memorySubtract() {
        const val = parseFloat(currentInput);
        if (!isNaN(val)) {
            memory -= val;
            addToHistory(`M- (${currentInput}) → M = ${memory}`);
        }
    }

    // ========== ОБРАБОТКА ВВОДА С КЛАВИАТУРЫ ==========
    resultInput.addEventListener('input', (e) => {
        let val = e.target.value;
        val = val.replace(/[^0-9.-]/g, '');
        const parts = val.split('.');
        if (parts.length > 2) val = parts[0] + '.' + parts.slice(1).join('');
        if (val.indexOf('-') > 0) val = val.replace(/-/g, '');
        if (val.startsWith('-') && val.indexOf('-', 1) !== -1) {
            val = '-' + val.slice(1).replace(/-/g, '');
        }
        if (val === '' || val === '-') val = '0';
        currentInput = val;
        resetInput = false;
        operation = null;
        previousInput = '';
        // Сбрасываем цветной режим при ручном вводе
        resetColorMode();
        updateDisplay(currentInput);
    });

    resultInput.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            setTimeout(() => {
                currentInput = resultInput.value;
                resetColorMode();
                adjustFontSize(currentInput);
            }, 0);
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            calculate();
        }
    });

    // ========== НАЗНАЧЕНИЕ ОБРАБОТЧИКОВ КНОПОК ==========
    digitBtns.forEach(btn => {
        btn.addEventListener('click', () => inputDigit(btn.textContent));
    });

    if (dotBtn) dotBtn.addEventListener('click', inputDot);
    if (opClear) opClear.addEventListener('click', clear);
    if (opSign) opSign.addEventListener('click', toggleSign);
    if (opPercent) opPercent.addEventListener('click', percent);
    if (opPlus) opPlus.addEventListener('click', () => setOperation('+'));
    if (opMinus) opMinus.addEventListener('click', () => setOperation('-'));
    if (opMult) opMult.addEventListener('click', () => setOperation('*'));
    if (opDiv) opDiv.addEventListener('click', () => setOperation('/'));
    if (opEqual) opEqual.addEventListener('click', calculate);

    // Дополнительные
    if (backspaceBtn) backspaceBtn.addEventListener('click', backspace);
    if (sqrtBtn) sqrtBtn.addEventListener('click', sqrt);
    if (squareBtn) squareBtn.addEventListener('click', square);
    if (factorialBtn) factorialBtn.addEventListener('click', factorial);
    if (btn000) btn000.addEventListener('click', add000);
    if (mcBtn) mcBtn.addEventListener('click', memoryClear);
    if (mrBtn) mrBtn.addEventListener('click', memoryRecall);
    if (mplusBtn) mplusBtn.addEventListener('click', memoryAdd);
    if (mminusBtn) mminusBtn.addEventListener('click', memorySubtract);

    // ========== УПРАВЛЕНИЕ ПАНЕЛЬЮ ИСТОРИИ ==========
    if (historyToggle) {
        historyToggle.addEventListener('click', () => {
            historyPanel.classList.toggle('hidden');
        });
    }

    document.addEventListener('click', (e) => {
        if (historyPanel && historyToggle &&
            !historyPanel.contains(e.target) &&
            !historyToggle.contains(e.target)) {
            historyPanel.classList.add('hidden');
        }
    });

    // ========== ИНИЦИАЛИЗАЦИЯ ==========
    updateDisplay(currentInput);
    renderHistory();
    console.log('Калькулятор загружен, история содержит', history.length, 'записей');
});
