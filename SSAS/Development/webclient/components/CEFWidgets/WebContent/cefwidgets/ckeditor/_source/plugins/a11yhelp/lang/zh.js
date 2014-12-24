﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "zh",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "帮助",
		contents : "帮助内容。要关闭此对话框，请按 ESC。",
		legend :
		[
			{
				name : "辅助功能选项指示信息",
				items :
				[
					{
						name : "编辑器工具栏",
						legend:
							"按 ${toolbarFocus} 将浏览到工具栏。 " +
							"按 TAB 键和 SHIFT-TAB 键将转到下一个和上一个工具栏组。 " +
							"按左方向键和右方向键将转到下一个和上一个工具栏按钮。 " +
							"按空格键或 ENTER 键将激活工具栏按钮。"
					},

					{
						name : "编辑器对话框",
						legend :
							"在对话框内，按 TAB 键可浏览至下一个对话框字段，按 SHIFT+TAB 键可移到前一个字段，按 ENTER 键可提交对话框，按 ESC 可取消对话框。 " +
							"对于具有多个选项卡页面的对话框，按 ALT+F10 键将浏览到选项卡列表。 " +
							"然后，按 TAB 键或右方向键将转到下一个选项卡。 " +
							"按 SHIFT+TAB 键或左方向键将转到上一个选项卡。 " +
							"按空格键或 ENTER 键将选择选项卡页面。"
					},

					{
						name : "编辑器上下文菜单",
						legend :
							"按 ${contextMenu} 或应用程序键将打开上下文菜单。 " +
							"然后，按 TAB 键或下方向键将转到下一个菜单选项。 " +
							"按 SHIFT+TAB 键或上方向键将转到上一个选项。 " +
							"按空格键或 ENTER 键将选择菜单选项。 " +
							"按空格键、ENTER 键或右方向键将打开当前选项的子菜单。 " +
							"按 ESC 键或左方向键将返回到父菜单项。 " +
							"按 ESC 键将关闭上下文菜单。"
					},

					{
						name : "编辑器列表框",
						legend :
							"在列表框内，按 TAB 键或下方向键将转到下一个列表项。 " +
							"按 SHIFT+TAB 键或上方向键将转到上一个列表项。 " +
							"按空格键或 ENTER 键将选择列表选项。 " +
							"按 ESC 键将关闭列表框。"
					},

					{
						name : "编辑器元素路径栏（如果可用*）",
						legend :
							"按 ${elementsPathFocus} 将浏览到元素路径栏。 " +
							"按 TAB 键或右方向键将转到下一个元素按钮。 " +
							"按 SHIFT+TAB 键或左方向键将转到上一个按钮。 " +
							"按空格键或 ENTER 键将选中编辑器中的元素。"
					}
				]
			},
			{
				name : "命令",
				items :
				[
					{
						name : " 撤销命令",
						legend : "按 ${undo}"
					},
					{
						name : " 重做命令",
						legend : "按 ${redo}"
					},
					{
						name : " 粗体命令",
						legend : "按 ${bold}"
					},
					{
						name : " 斜体命令",
						legend : "按 ${italic}"
					},
					{
						name : " 下划线命令",
						legend : "按 ${underline}"
					},
					{
						name : " 链接命令",
						legend : "按 ${link}"
					},
					{
						name : " 工具栏折叠命令（如果可用*）",
						legend : "按 ${toolbarCollapse}"
					},
					{
						name : " 辅助功能选项帮助",
						legend : "按 ${a11yHelp}"
					}
				]
			},

			{	//added by ibm
				name : "注",
				items :
				[
					{
						name : "",
						legend : "* 管理员可能已将某些功能禁用。"
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "在新窗口中打开更多帮助主题",
		helpLink : "更多帮助主题"
	}

});
