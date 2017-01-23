/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "ja",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "ヘルプ",
		contents : "ヘルプ・コンテンツ。このダイアログを閉じるには ESC キーを押します。",
		legend :
		[
			{
				name : "アクセス支援機能の使用方法",
				items :
				[
					{
						name : "エディターのツールバー",
						legend:
							"ツールバーにナビゲートするには、${toolbarFocus} を押します。" +
							"次のツールバー・グループに移動するには TAB キーを使用し、前のツールバー・グループに移動するには SHIFT+TAB キーを使用します。" +
							"次のツールバー・ボタンに移動するには右矢印キーを使用し、前のツールバー・ボタンに移動するには左矢印キーを使用します。" +
							"ツールバー・ボタンをアクティブにするには、SPACE キーまたは ENTER キーを押します。"
					},

					{
						name : "エディターのダイアログ",
						legend :
							"ダイアログの中で TAB キーを押すと、次のダイアログ・フィールドに移動し、SHIFT+TAB キーを押すと、前のフィールドに移動します。ダイアログを送信するには、ENTER キーを押します。ダイアログをキャンセルするには、ESC キーを押します。" +
							"複数のタブ・ページがあるダイアログで ALT+F10 キーを押すと、タブ・リストにナビゲートします。 " +
							"次のタブに移動するには、TAB キーまたは右矢印キーを使用します。 " +
							"前のタブに移動するには、SHIFT+TAB キーまたは左矢印キーを使用します。 " +
							"タブ・ページを選択するには、SPACE キーまたは ENTER キーを押します。"
					},

					{
						name : "エディターのコンテキスト・メニュー",
						legend :
							"コンテキスト・メニューを開くには、${contextMenu} または APPLICATION キーを押します。" +
							"次のメニュー・オプションに移動するには、TAB キーまたは下矢印キーを使用します。" +
							"前のオプションに移動するには、SHIFT+TAB キーまたは上矢印キーを使用します。" +
							"メニュー・オプションを選択するには、SPACE キーまたは ENTER キーを押します。" +
							"現在のオプションのサブメニューを開くには、SPACE キー、ENTER キー、右矢印キーを使用します。 " +
							"親メニュー項目に戻るには、ESC キーまたは左矢印キーを使用します。 " +
							"コンテキスト・メニューを閉じるには、ESC キーを使用します。"
					},

					{
						name : "エディターのリスト・ボックス",
						legend :
							"リスト・ボックス内の次のリスト項目に移動するには、TAB キーまたは下矢印キーを使用します。 " +
							"前のリスト項目に移動するには、SHIFT+TAB キーまたは上矢印キーを使用します。 " +
							"リスト・オプションを選択するには、SPACE キーまたは ENTER キーを押します。" +
							"リスト・ボックスを閉じるには、ESC キーを押します。"
					},

					{
						name : "エディターのエレメント・パス・バー (使用可能な場合*)",
						legend :
							"エレメント・パス・バーにナビゲートするには、${elementsPathFocus} を押します。" +
							"次のエレメント・ボタンに移動するには、TAB キーまたは右矢印キーを使用します。" +
							"前のボタンに移動するには、SHIFT+TAB キーまたは左矢印キーを使用します。" +
							"エディター内のエレメントを選択するには、SPACE キーまたは ENTER キーを押します。"
					}
				]
			},
			{
				name : "コマンド",
				items :
				[
					{
						name : " 取り消しコマンド",
						legend : "${undo} を押します"
					},
					{
						name : " やり直しコマンド",
						legend : "${redo} を押します"
					},
					{
						name : " 太字コマンド",
						legend : "${bold} を押します"
					},
					{
						name : " イタリック・コマンド",
						legend : "${italic} を押します"
					},
					{
						name : " 下線コマンド",
						legend : "${underline} を押します"
					},
					{
						name : " リンク・コマンド",
						legend : "${link} を押します"
					},
					{
						name : " ツールバー省略表示コマンド (使用可能な場合*)",
						legend : "${toolbarCollapse} を押します"
					},
					{
						name : " アクセス支援機能のヘルプ",
						legend : "${a11yHelp} を押します"
					}
				]
			},

			{	//added by ibm
				name : "メモ",
				items :
				[
					{
						name : "",
						legend : "* 一部の機能は、管理者によって使用不可に設定されている場合があります。"
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "詳細ヘルプ・トピックを新規ウィンドウで開く",
		helpLink : "詳細ヘルプ・トピック"
	}

});
