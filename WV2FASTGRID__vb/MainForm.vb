Imports System
Imports System.Configuration
Imports System.Drawing
Imports System.IO
Imports System.Windows.Forms
Imports Microsoft.Web.WebView2.Core
Imports Microsoft.Web.WebView2.WinForms




Public NotInheritable Class MainForm
    ''' <summary>
    ''' 생성자
    ''' </summary>
    Public Sub New()
        ' 디자이너에서 이 호출이 필요합니다.
        InitializeComponent()

        ' InitializeComponent() 호출 뒤에 초기화 코드를 추가하세요.

    End Sub



    ''' <summary>
    ''' Load 이벤트
    ''' </summary>
    ''' <param name="ea"></param>
    Protected Overrides Sub OnLoad(ea As EventArgs)
        MyBase.OnLoad(ea)

        Text = [GetType]().Namespace
        MinimumSize = New Size(400, 300)
        AllowDrop = False


        '모니터다 듀얼 이상일때
        Dim tcs As Screen = Screen.FromPoint(Cursor.Position)
        Dim tsb As Rectangle = tcs.WorkingArea
        Dim tlp As Point = New Point(tsb.Right, tsb.Bottom)
        Dim tws As Size = Size
        tlp.Offset(-(tws.Width + 10), -(tws.Height + 10))
        Location = tlp


        m_cdp = Environment.GetCommandLineArgs()(0)
        m_cdp = Path.GetDirectoryName(m_cdp)


        m_wb2 = WebView21
        m_wb2.AllowExternalDrop = False
        prWebView2EnsureCoreWebView2Async()
        AddHandler m_wb2.CoreWebView2InitializationCompleted, AddressOf prCoreWebView2InitializationCompleted


        'Dim htmlPath As String = Environment.GetCommandLineArgs()(0)
        'htmlPath = Path.Combine(Path.GetDirectoryName(htmlPath), "HtmlRoot")

        'Dim htmlRootFile As String = Path.Combine(htmlPath, "Root.html")
        'If File.Exists(htmlRootFile) Then
        '    _wb2.Source = New Uri(htmlRootFile)
        'End If


        Dim epp As String = ConfigurationManager.AppSettings("EntryPoint")
        Dim htmlPath As String = Path.GetDirectoryName(Environment.GetCommandLineArgs()(0))
        Dim htmlRootFile As String = htmlPath & epp
        If File.Exists(htmlRootFile) Then
            m_wb2.Source = New Uri(htmlRootFile)
        End If
    End Sub


    ''' <summary>
    ''' CurrentDirectoryPath
    ''' </summary>
    Private m_cdp As String

    ''' <summary>
    ''' 
    ''' </summary>
    Private m_wb2 As WebView2

    ''' <summary>
    ''' 
    ''' </summary>
    Private m_cwb2 As CoreWebView2




    ''' <summary>
    ''' EnvironmentOptions 설정
    ''' </summary>
    Private Async Sub prWebView2EnsureCoreWebView2Async()
        Dim cweo As New CoreWebView2EnvironmentOptions("--disable-web-security")
        Dim env As CoreWebView2Environment = Await CoreWebView2Environment.CreateAsync(Nothing, Nothing, cweo)
        Await m_wb2.EnsureCoreWebView2Async(env)
    End Sub



    ''' <summary>
    ''' Completed 이벤트
    ''' </summary>
    ''' <param name="sd"></param>
    ''' <param name="ea"></param>
    Private Sub prCoreWebView2InitializationCompleted(sd As Object, ea As CoreWebView2InitializationCompletedEventArgs)
        If ea.IsSuccess Then
            m_cwb2 = m_wb2.CoreWebView2
            '_cwb2.Settings.IsPinchZoomEnabled = False
            AddHandler m_cwb2.ContextMenuRequested, AddressOf prContextMenuRequested

            If ThRuntime.IsDebugMode Then
                m_cwb2.OpenDevToolsWindow()
                'm_cwb2.OpenTaskManagerWindow()
            End If

            AddHandler m_wb2.WebMessageReceived, AddressOf prWebMessageReceived
        End If
    End Sub



    ''' <summary>
    ''' 
    ''' </summary>
    ''' <param name="sd"></param>
    ''' <param name="ea"></param>
    Private Sub prContextMenuRequested(sd As Object, ea As CoreWebView2ContextMenuRequestedEventArgs)
        ea.Handled = True
    End Sub



    ''' <summary>
    ''' 
    ''' </summary>
    ''' <param name="sd"></param>
    ''' <param name="ea"></param>
    Private Sub prWebMessageReceived(sd As Object, ea As CoreWebView2WebMessageReceivedEventArgs)
        Dim msg As String = ea.TryGetWebMessageAsString()
        'MsgBox(msg)

        Dim mda() As String = msg.Split(";"c)

        Select Case mda(0)
            Case "LoadSubContent"
                prLoadSubContent(mda(1))

        End Select

        '_cwb2.ExecuteScriptAsync("alert('xxxx');")
    End Sub



    ''' <summary>
    ''' 
    ''' </summary>
    ''' <param name="fnm"></param>
    Private Sub prLoadSubContent(fnm As String)
        Dim fp As String = Path.Combine(m_cdp & "\HtmlRoot", fnm)
        If File.Exists(fp) Then
            Dim ta As String = File.ReadAllText(fp)
            'MsgBox(tta)
            Dim cfs As String = $"__fn_loadSub(`" & ta & "`);"
            'MsgBox(tcfs)
            m_cwb2.ExecuteScriptAsync(cfs)
            '_cwb2.ExecuteScriptAsync("alert('xxxxxxxx');")

        End If

    End Sub






    'Protected Overrides Sub OnDragEnter(ea As DragEventArgs)
    '    MyBase.OnDragEnter(ea)
    '    ea.Effect = DragDropEffects.Link
    'End Sub



    'Protected Overrides Sub OnDragDrop(ea As DragEventArgs)
    '    MyBase.OnDragDrop(ea)
    'End Sub

End Class






