### заметки

две датабазы редис и турсо. в редис пишем все значения текущего открытого турнира. как-только турнир закрфывается, все данные отрпавляются в турсо и трутся из редиса.

ограничение на 2 или 3 незавершенных турнира одновременно. пользователю предоставляется опция закрыть все незавершённые турниры одной кнопкой. или удалить

three data-storages: 1. local storage (if no...) 2. redis (if no...) 3. turso
this way data always appears as fast as possible. state is saved in both localstorage and redis.

в будущем не забыть думать про сокет сервер для турнирной сетки. откуда сокет берёт стейт. куда даёт его

== обязательно ограничние на незакрытые турниры. либо удаляй, либо дописывай результаты и закрывай ==

нужно хранить "рейтинг игрока до партии" потому что как только мы записываем результат мы хотим динамически везде обновлять рейтинги этих игроков, но если результат записан неправильно и его меняют, нам надо вернуть предыдущие значения рейтингов. хранить можно просто в редисе по айди игры и удалять по завершении турнира.

после сздания турнира страница игроков выглядит следующим образом. на ней уже есть игроки команды и на них можно нажимать. по нажатию игрок отмечается например цветом и перемещается вверх списка - теперь он записан в турнир.

- альтернативный вариант: поиск где список появляетсятолькокогда в инпуте что-тоуказано

### структура

tournament dashboard:
вкладки до начала: players, bracket
вкладки во время т-ра: (?? ongoing games), bracket, standings (переименовывать игроков прямо там где стендингс)

NONorgamizer (after http headers are checked) is redirected to /view

кнопка перемешать находится не там где игрои, а там где сетка (у челонджа перетасовка там где игроки)

! возможность удалять игроков из швейцарки по ходу турнира

### организатор

- [ ] по дефолту создаётся органзиатор с названием `organizer ${lichess_nickname}`
- [ ] при первом создании турнира у человека выскакивает модал с объяснением, что:
  - a: если у него есть команда, лучше поменять `organizer ${lichess_nickname}` на название команды
  - б: если кто-то уже делал эту команду на мктуре, он может вступить в неё а не делать дубликат.
- [ ] у юзера не может быть ноль команд. то есть пока он не стал админом другой команды он не может удалить свою дефолтную
- [ ] турниры линкаются только к организаторам, а не к юзерам которые его создают
- [ ] в будущем если юзер хочет удалить организатора, который уже проводил турниры, и при этом юзер - админ какого-то ещё орга, ему предлагается перенести те турниры в какого-нибудь из его остальных оргов напр:
  - юзер X провёл турнир под дефолтным оргом "организатор Х" дальше стал админом команд Y и Z. теперь когда он хочет удалить своего дефолтного "organizer X" ему предлагается три опции:
    - перенести историю турниров в орга Y
    - перенести историю турниров в орга Z
    - удалить турниры проводившиеся от "организатор Х"
- [ ] если один из админов команды не является админом другой команды (удалил своего дефолтного орга), эту команду удалить нельзя
- [ ] когда человек вступает в команду/oрга или создаёт команду/орга у него должа быть опция "set as default"
