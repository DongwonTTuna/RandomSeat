<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>ランダム席替え</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="min-h-screen bg-slate-900 text-gray-50 max-h-screen">
    <div class="m-auto w-max">
        <div class="inline-block">
            <form class="text-center" action="/randomseatprint" method="post" id='formg'>
                <div class='students shadow-xl shadow-fuchsia-900 bg-gradient-to-br to-purple-800 from-indigo-600 mx-auto mt-20 rounded-xl px-6 py-6'>
                    <p>学生数を選択してください
                    <p>
                        <select class="bg-gray-800 rounded-lg" id="dm" name="dm">
                            <option value=""></option>
                            <?php
                            for ($i = 1; $i < 51; $i++) {
                                echo "<option value='", $i, "'>", $i, "</option>";
                            }
                            ?>
                        </select>
                    <div class="inform"></div>
                    <div class="student"></div>
                </div>
                <div class="relative rowcol hidden mx-auto">
                    <br>
                    座席の行と列を入力してください。
                    行
                    <select class="bg-gray-800 rounded-lg" id="row" name='row'>
                        <option value=""></option>
                        <?php
                        for ($i = 1; $i < 6; $i++) {
                            echo "<option value='", $i, "'>", $i, "</option>";
                        }
                        ?>
                    </select>
                    列
                    <select class="bg-gray-800 rounded-lg" id="col" name='col'>
                        <option value=""></option>
                        <?php
                        for ($i = 1; $i < 11; $i++) {
                            echo "<option value='", $i, "'>", $i, "</option>";
                        }
                        ?>
                    </select>
                </div>
                <br>
                <div class="dddi text-orange-400 text-xl font-mono"></div>
                <div class="exl h-auto width-auto">
                </div>
                <div class="text-center my-20">
                    <button type="submit" class="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block">
                        <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                        <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                        <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                        <span class="relative">印刷ページ</span>
                    </button>
                    <button type="button" ondblclick='clearlocal()' class="ml-20 px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block bg-gradient-to-br from-red-600 to-red-500">
                        <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-red-600 to-red-500"></span>
                        <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-red-600 to-red-500"></span>
                        <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-red-500 from-red-600"></span>
                        <span class="relative">データ削除</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/static/js/randomseat.js"></script>
</body>

</html>