/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "zh-tw",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "說明",
		contents : "說明內容。若要關閉此對話框，請按 ESC。",
		legend :
		[
			{
				name : "協助工具指示",
				items :
				[
					{
						name : "編輯器工具列",
						legend:
							"按 ${toolbarFocus}，可導覽至工具列。 " +
							"使用 TAB 及 SHIFT-TAB，可移至下一個及前一個工具列群組。 " +
							"使用右移鍵或左移鍵，可移至下一個及前一個工具列按鈕。 " +
							"按空格鍵或 ENTER，可啟動工具列按鈕。"
					},

					{
						name : "編輯器對話框",
						legend :
							"在對話框中，按 TAB 可導覽至下一個對話框欄位，按 SHIFT + TAB 可移至前一個欄位，按 ENTER 可提交對話框，按 ESC 可取消對話框。 " +
							"若對話框具有多個標籤頁，按 ALT + F10 可導覽至標籤清單。 " +
							"接著，使用 TAB 或右移鍵，可移至下一個標籤。 " +
							"使用 SHIFT + TAB 或左移鍵，可移至前一個標籤。 " +
							"按空格鍵或 ENTER，可選取標籤頁。"
					},

					{
						name : "編輯器快速功能表",
						legend :
							"按 ${contextMenu} 或 APPLICATION KEY，可開啟快速功能表。 " +
							"接著，使用 TAB 或下移箭，可移至下一個功能表選項。 " +
							"使用 SHIFT+TAB 或上移箭，可移至前一個選項。 " +
							"按空格鍵或 ENTER，可選取功能表選項。 " +
							"使用空格鍵或 ENTER 或右移箭，可開啟現行選項的子功能表。 " +
							"使用 ESC 或左移箭，可回到母項功能表項目。 " +
							"使用 ESC 可關閉快速功能表。"
					},

					{
						name : "編輯器清單框",
						legend :
							"在清單框內，使用 TAB 或下移鍵，可移至下一個清單項目。 " +
							"使用 SHIFT + TAB 或上移鍵，可移至前一個清單。 " +
							"按空格鍵或 ENTER，可選取清單選項。 " +
							"按 ESC，可關閉清單框。"
					},

					{
						name : "編輯器元素路徑列（如果可用的話*）",
						legend :
							"按 ${elementsPathFocus}，可導覽至元素路徑列。 " +
							"使用 TAB 或右移箭，可移至下一個元素按鈕。 " +
							"使用 SHIFT+TAB 或左移箭，可移至前一個按鈕。 " +
							"按空格鍵或 ENTER，可選取編輯器中的元素。"
					}
				]
			},
			{
				name : "指令",
				items :
				[
					{
						name : " 復原指令",
						legend : "按下 ${undo}"
					},
					{
						name : " 重做指令",
						legend : "按下 ${redo}"
					},
					{
						name : " 粗體指令",
						legend : "按下 ${bold}"
					},
					{
						name : " 斜體指令",
						legend : "按下 ${italic}"
					},
					{
						name : " 底線指令",
						legend : "按下 ${underline}"
					},
					{
						name : " 鏈結指令",
						legend : "按下 ${link}"
					},
					{
						name : " 工具列收合指令（如果可用的話*）",
						legend : "按下 ${toolbarCollapse}"
					},
					{
						name : " 協助工具說明",
						legend : "按下 ${a11yHelp}"
					}
				]
			},

			{	//added by ibm
				name : "附註",
				items :
				[
					{
						name : "",
						legend : "* 部分功能可由管理者停用。"
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "在新視窗中開啟更多說明主題",
		helpLink : "更多說明主題"
	}

});
