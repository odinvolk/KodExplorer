В последнем релизе Linux Mint Росинки проблему с кракозяблами решили путем установки по умолчанию пакетов p7zip, p7zip-full, zip, и unzip, а так же библиотеки libnatspec0 с репозизитория ppa:frol/zip-i18n. p7zip-rar и unrar  установлены со стандартных убунтовских реп. В итоге все работает на ура и проблем с распаковкой виндовых архивов и кракозяблами в них больше не возникает!

```
sudo add-apt-repository ppa:frol/zip-i18n
sudo apt-get update
```

https://launchpad.net/~frol/+archive/ubuntu/zip-i18n



На все случаи жизни
```
# sudo apt-get install unace unrar zip unzip p7zip-full p7zip-rar sharutils rar uudeview mpack lha arj cabextract file-roller
```
