
## Установите Dropbox, чтобы использовать свой аккаунт на все сто!
    После завершения скачивания запустите установщик Dropbox.

Если вы хотите использовать Dropbox на Linux Desktop, установите соответствующий пакет.
Если вашего дистрибутива нет в списке, выберите вариант «Скомпилировать из исходного кода».

![](https://www.dropbox.com/static/images/ubuntu-icon.png) Ubuntu 14.04 или выше (.deb) [64-bit](https://www.dropbox.com/download?dl=packages/ubuntu/dropbox_2019.01.31_amd64.deb) [32-bit](https://www.dropbox.com/download?dl=packages/ubuntu/dropbox_2019.01.31_i386.deb)

![](https://www.dropbox.com/static/images/fedora-icon.png) Fedora 21 или выше (.rpm) [64-bit](https://www.dropbox.com/download?dl=packages/fedora/nautilus-dropbox-2019.01.31-1.fedora.x86_64.rpm) [32-bit](https://www.dropbox.com/download?dl=packages/fedora/nautilus-dropbox-2019.01.31-1.fedora.i386.rpm)

![](https://www.dropbox.com/static/images/linux-icon.png) [Скомпилировать из исходного кода](https://www.dropbox.com/help/247)


    **Примечание.** Эти пакеты устанавливают приложение-помощник с открытым исходным кодом. Его версия обновляется реже, чем основная программа Dropbox. Эти пакеты всегда будут устанавливать последнюю версию Dropbox для Linux.

## Установка Dropbox на компьютер без монитора через командную строку

Демон Dropbox отлично работает на 32-разрядных и 64-разрядных серверах Linux. Чтобы установить его, в терминале Linux запустите команду, которая указана ниже.

### 32-bit:

```
cd ~ && wget -O - "https://www.dropbox.com/download?plat=lnx.x86" | tar xzf -
```

### 64-bit:

```
cd ~ && wget -O - "https://www.dropbox.com/download?plat=lnx.x86_64" | tar xzf -
```

После этого запустите демон Dropbox из вновь созданной папки `.dropbox-dist`.

```
~/.dropbox-dist/dropboxd
```

Если вы используете программу Dropbox на своем сервере впервые, то при создании нового аккаунта или добавлении сервера в существующий аккаунт вам будет необходимо скопировать и вставить ссылку в рабочий браузер. После этого в вашем домашнем каталоге будет создана папка Dropbox. Чтобы управлять программой Dropbox из командной строки, скачайте этот [сценарий Python](https://www.dropbox.com/download?dl=packages/dropbox.py) . Для простого доступа поместите символическую ссылку на сценарий в любой позиции системной переменной PATH.