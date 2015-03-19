/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license


Portions Copyright IBM Corp., 2010-2013.
*/

CKEDITOR.plugins.setLang( "a11yhelp", "ko",
{

	// When translating all fields in accessibilityHelp object, do not translate anything with the form ${xxx}
	accessibilityHelp :
	{
		title : "도움말",
		contents : "도움말 목차입니다. 이 대화 상자를 닫으려면 ESC를 누르십시오.",
		legend :
		[
			{
				name : "내게 필요한 옵션 지시사항",
				items :
				[
					{
						name : "편집기 도구 모음",
						legend:
							"도구 모음으로 이동하려면 ${toolbarFocus}을(를) 누르십시오. " +
							"TAB 및 SHIFT-TAB을 사용하여 다음 및 이전 도구 모음 그룹으로 이동하십시오. " +
							"오른쪽 화살표 또는 왼쪽 화살표를 사용하여 다음 및 이전 도구 모음으로 이동하십시오. " +
							"SPACE 또는 ENTER를 눌러 도구 모음 단추를 활성화하십시오."
					},

					{
						name : "편집기 대화 상자",
						legend :
							"대화 상자 내에서 Tab을 누르면 다음 대화 상자 필드로 이동할 수 있습니다. 이전 필드로 이동하려면 Shift+Tab을 누르고 대화 상자를 제출하려면 Enter를 누르고 대화 상자를 취소하려면 Esc를 누르십시오." +
							"다중 탭 페이지가 있는 대화 상자의 경우, ALT + F10을 눌러 탭 목록으로 이동하십시오. " +
							"그런 다음 TAB 또는 오른쪽 화살표를 사용하여 다음 탭으로 이동하십시오. " +
							"SHIFT + TAB 또는 왼쪽 화살표를 사용하여 이전 탭으로 이동하십시오. " +
							"탭 페이지를 선택하려면 SPACE 또는 ENTER를 누르십시오."
					},

					{
						name : "편집기 컨텍스트 메뉴",
						legend :
							"컨텍스트 메뉴를 열려면 ${contextMenu} 또는 애플리케이션 키를 누르십시오. " +
							"그런 다음 TAB 또는 아래로 화살표를 사용하여 다음 메뉴 옵션으로 이동하십시오. " +
							"SHIFT+TAB 또는 위로 화살표를 사용하여 이전 옵션으로 이동하십시오. " +
							"메뉴 옵션을 선택하려면 SPACE 또는 ENTER를 누르십시오. " +
							"SPACE 또는 ENTER 또는 오른쪽 화살표를 사용하여 현재 옵션의 하위 메뉴를 여십시오. " +
							"ESC 또는 왼쪽 화살표를 사용하여 상위 메뉴 항목으로 다시 이동하십시오. " +
							"Esc를 사용하여 컨텍스트 메뉴를 닫을 수 있습니다."
					},

					{
						name : "편집기 목록 상자",
						legend :
							"목록 상자 내에서 Tab 또는 아래로 화살표를 사용하여 다음 목록 항목으로 이동하십시오. " +
							"SHIFT+TAB 또는 위로 화살표를 사용하여 이전 목록 항목으로 이동하십시오. " +
							"목록 옵션을 선택하려면 SPACE 또는 ENTER를 누르십시오. " +
							"목록 상자를 닫으려면 ESC를 누르십시오."
					},

					{
						name : "편집기 요소 경로 모음(사용 가능한 경우*)",
						legend :
							"요소 경로 모음으로 이동하려면 ${elementsPathFocus}를 누르십시오. " +
							"TAB 또는 오른쪽 화살표를 사용하여 다음 요소 단추로 이동하십시오. " +
							"SHIFT+TAB 또는 왼쪽 화살표를 사용하여 이전 단추로 이동하십시오. " +
							"편집기에서 요소를 선택하려면 SPACE 또는 ENTER를 누르십시오. "
					}
				]
			},
			{
				name : "명령",
				items :
				[
					{
						name : " 실행 취소 명령",
						legend : "${undo} 누르기"
					},
					{
						name : " 다시 실행 명령",
						legend : "${redo} 누르기"
					},
					{
						name : " 굵게 명령",
						legend : "${bold} 누르기"
					},
					{
						name : " 기울임꼴 명령",
						legend : "${italic} 누르기"
					},
					{
						name : "밑줄 명령",
						legend : "${underline} 누르기"
					},
					{
						name : " 링크 명령",
						legend : "${link} 누르기"
					},
					{
						name : "도구 모음 접기 명령(사용 가능한 경우*)",
						legend : "${toolbarCollapse} 누르기"
					},
					{
						name : "내게 필요한 옵션 도움말",
						legend : "${a11yHelp} 누르기"
					}
				]
			},

			{	//added by ibm
				name : "참고",
				items :
				[
					{
						name : "",
						legend : "* 관리자가 일부 기능을 사용 안함으로 설정할 수 있습니다."
					}
				]
			}
		]
	},

	ibm_a11yhelp :
	{
		helpLinkDescription : "새 창에서 도움말 항목 추가로 열기",
		helpLink : "추가 도움말 항목"
	}

});
