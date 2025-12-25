// Переключение между играми
const gameItems = document.querySelectorAll('.game-item');
const gameContainers = document.querySelectorAll('.game-container');
const currentGameTitle = document.getElementById('current-game');

gameItems.forEach(item => {
    item.addEventListener('click', function() {
        // Убираем активный класс у всех
        gameItems.forEach(i => i.classList.remove('active'));
        gameContainers.forEach(c => c.classList.remove('active'));
        
        // Добавляем активный класс к выбранному
        this.classList.add('active');
        const gameId = this.getAttribute('data-game');
        document.getElementById(gameId).classList.add('active');
        
        // Обновляем заголовок
        updateGameTitle(gameId);
    });
});

function updateGameTitle(gameId) {
    const titles = {
        'pubg': 'PUBG Mobile UC',
        'genshin': 'Genshin Impact - Genesis Crystals',
        'honkai': 'Honkai: Star Rail - Сущности',
        'zzz': 'Zenless Zone Zero - Монокромы',
        'arena': 'Arena Breakout - Облигации'
    };
    currentGameTitle.textContent = titles[gameId] || 'GameRefill';
}

// Работа FAQ
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('.fa-chevron-down');
        
        // Закрываем все другие ответы
        document.querySelectorAll('.faq-answer').forEach(ans => {
            if (ans !== answer && ans.classList.contains('active')) {
                ans.classList.remove('active');
                const otherIcon = ans.previousElementSibling.querySelector('.fa-chevron-down');
                otherIcon.classList.remove('fa-chevron-up');
                otherIcon.classList.add('fa-chevron-down');
            }
        });
        
        // Переключаем текущий ответ
        answer.classList.toggle('active');
        
        // Меняем иконку
        if (answer.classList.contains('active')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
});

// Выбор пакетов
document.querySelectorAll('.package-item').forEach(pack => {
    pack.addEventListener('click', function() {
        // Находим родительский контейнер игры
        const gameContainer = this.closest('.game-container');
        
        // Убираем выделение со всех пакетов в этой игре
        gameContainer.querySelectorAll('.package-item').forEach(p => {
            p.classList.remove('selected');
        });
        
        // Выделяем выбранный пакет
        this.classList.add('selected');
        
        // Обновляем кнопку покупки
        const amount = this.querySelector('.package-amount').textContent;
        const price = this.querySelector('.package-price').textContent;
        const buyBtn = gameContainer.querySelector('.buy-btn');
        
        if (buyBtn) {
            buyBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> Купить за ${price} (${amount})`;
        }
    });
});

// Обработка покупки
document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const gameContainer = this.closest('.game-container');
        const gameId = gameContainer.id;
        
        // Проверяем в зависимости от игры
        let isValid = true;
        let message = '';
        
        switch(gameId) {
            case 'pubg':
                const pubgUid = document.getElementById('pubg-uid').value;
                const pubgConfirmUid = document.getElementById('pubg-confirm-uid').value;
                if (!pubgUid || !pubgConfirmUid) {
                    isValid = false;
                    message = 'Пожалуйста, заполните оба поля с UID!';
                } else if (pubgUid !== pubgConfirmUid) {
                    isValid = false;
                    message = 'Введенные UID не совпадают!';
                }
                break;
                
            case 'genshin':
                const genshinUid = document.getElementById('genshin-uid').value;
                if (!genshinUid) {
                    isValid = false;
                    message = 'Пожалуйста, введите UID!';
                }
                break;
                
            case 'honkai':
                const honkaiUid = document.getElementById('honkai-uid').value;
                if (!honkaiUid) {
                    isValid = false;
                    message = 'Пожалуйста, введите UID!';
                }
                break;
                
            case 'zzz':
                const zzzUid = document.getElementById('zzz-uid').value;
                if (!zzzUid) {
                    isValid = false;
                    message = 'Пожалуйста, введите UID!';
                }
                break;
                
            case 'arena':
                const arenaUid = document.getElementById('arena-uid').value;
                if (!arenaUid) {
                    isValid = false;
                    message = 'Пожалуйста, введите UID!';
                }
                break;
        }
        
        if (!isValid) {
            alert(message);
            return;
        }
        
        // Если все проверки пройдены
        alert('Заказ обрабатывается... Перенаправляем на страницу оплаты.');
        
        // В реальном приложении здесь был бы переход на оплату
        // window.location.href = 'https://payment-gateway.com';
    });
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Выбираем первый пакет в каждой игре по умолчанию
    document.querySelectorAll('.game-container').forEach(container => {
        const firstPackage = container.querySelector('.package-item');
        if (firstPackage) {
            firstPackage.classList.add('selected');
        }
    });
});