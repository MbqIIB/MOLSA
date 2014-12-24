/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "tr",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "Yardım",
		contents : "Yardımın İçindekiler. Bu iletişim kutusunu kapatmak için ESC tuşuna basın.",
		legend :
		[
			{
				name : "Erişilirlik Yönergeleri",
				items :
				[
					{
						name : "Düzenleyici Araç Çubuğu",
						legend:
							"Araç çubuğuna gitmek için ${toolbarFocus} tuşuna basın. " +
							"SEKME ve ÜST KARAKTER-SEKME tuşlarıyla bir sonraki ve bir önceki araç çubuğu grubuna gidin. " +
							"SAĞ OK ve SOL OK tuşlarıyla bir sonraki ve bir önceki araç çubuğu düğmesine gidin. " +
							"Araç çubuğu düğmesini etkinleştirmek için ARA ÇUBUĞU ya da ENTER tuşuna basın."
					},

					{
						name : "Düzenleyici İletişim Kutusu",
						legend :
							"Bir iletişim kutusunun içinde, sonraki iletişim kutusu alanına gitmek için SEKME tuşuna basın; önceki alana gitmek için ÜST KARAKTER + SEKME tuşuna basın; iletişim kutusunu sunmak için ENTER tuşuna basın; iletişim kutusunu iptal etmek için ESC tuşuna basın. " +
							"Birden çok sekmeli sayfa içeren iletişim kutularında, sekme listesine gitmek için ALT + F10 tuş birleşimine basın. " +
							"Sonraki sekmeye gitmek için SEKME ya da SAĞ OK tuşuna basın. " +
							"Önceki sekmeye gitmek için ÜST KARAKTER + SEKME ya da SOL OK tuşuna basın. " +
							"Sekme sayfasını seçmek için ARA ÇUBUĞU ya da ENTER tuşuna basın."
					},

					{
						name : "Düzenleyici Bağlam Menüsü",
						legend :
							"Bağlam menüsünü açmak için ${contextMenu} ya da UYGULAMA TUŞUNA basın. " +
							"Daha sonra, sonraki menü seçeneğine gitmek için SEKME ya da AŞAĞI OK tuşuna basın. " +
							"Önceki seçeneğe ÜST KARAKTER+SEKME ya da YUKARI OK tuşuyla gidin. " +
							"Menü seçeneğini belirlemek için ARA ÇUBUĞU ya da ENTER tuşuna basın. " +
							"Geçerli seçeneğin alt menüsünü açmak için ARA ÇUBUĞU ya da ENTER ya da SAĞ OK tuşuna basın. " +
							"Üst menü öğesine dönmek için ESC ya da SOL OK tuşuna basın. " +
							"Bağlam menüsünü ESC tuşuyla kapatın."
					},

					{
						name : "Düzenleyici Liste Kutusu",
						legend :
							"Bir liste kutusunun içindeyken sonraki liste öğesine gitmek için SEKME ya da AŞAĞI OK tuşuna basın. " +
							"Önceki liste öğesine gitmek için ÜST KARAKTER + SEKME ya da YUKARI OK tuşuna basın. " +
							"Liste seçeneğini belirlemek için ARA ÇUBUĞU ya da ENTER tuşuna basın. " +
							"Liste kutusunu kapatmak için ESC tuşuna basın."
					},

					{
						name : "Düzenleyici Öğe Yolu Çubuğu (varsa*)",
						legend :
							"Öğe yolu çubuğuna gitmek için ${elementsPathFocus} tuşuna basın. " +
							"Sonraki öğe düğmesine SEKME ya da SAĞ OK tuşuyla gidin. " +
							"Önceki düğmeye ÜST KARAKTER+SEKME ya da SOL OK tuşuyla gidin. " +
							"Düzenleyicide öğeyi seçmek için ARA ÇUBUĞU ya da ENTER tuşuna basın."
					}
				]
			},
			{
				name : "Komutlar",
				items :
				[
					{
						name : " Geri Al komutu",
						legend : "${undo} tuşuna basın"
					},
					{
						name : " Yinele komutu",
						legend : "${redo} tuşuna basın"
					},
					{
						name : " Koyu komutu",
						legend : "${bold} tuşuna basın"
					},
					{
						name : " İtalik komutu",
						legend : "${italic} tuşuna basın"
					},
					{
						name : " Altını Çiz komutu",
						legend : "${underline} tuşuna basın"
					},
					{
						name : " Bağlantı Oluştur komutu",
						legend : "${link} tuşuna basın"
					},
					{
						name : " Araç Çubuğunu Daralt komutu (varsa*)",
						legend : "${toolbarCollapse} tuşuna basın"
					},
					{
						name : " Erişilebilirlik Yardımı",
						legend : "${a11yHelp} tuşuna basın"
					}
				]
			},

			{	//added by ibm
				name : "Not",
				items :
				[
					{
						name : "",
						legend : "* Bazı özellikler, yöneticiniz tarafından devre dışı bırakılabilir."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "Diğer yardım konularını yeni bir pencerede açın",
		helpLink : "Diğer Yardım Konuları"
	}

});
