<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>PHPサンプル</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="min-h-screen max-h-screen bg-gray-100 bdy overflow-hidden" style="min-width:1400px;">
    <div class="mx-auto text-center">
        <h1 class="font-bold bg-gray-400 w-fit m-auto mb-16 rounded-bl-md rounded-br-md" style="width: 1200px;">前</h1>
        <div class="h-full w-12 fixed top-0 left-0 bg-gray-600 text-gray-200 pt-5">
            <h5 class="mt-96">廊<br><br><br><br>下<br><br><br><br><br>側</h5>
        </div>
        <div class="h-full w-12 fixed top-0 right-0 bg-gray-50 pt-5">
            <h5 class="mt-96">窓<br><br><br><br><br><br><br><br><br><br>側</h5>
        </div>
        <div class="z-[-1] absolute inset-x-3/4 mr-96 text-center bg-gray-800 text-neutral-100 w-1/12 py-8 rounded-md">教卓</div>
        <?php
        $alert = '<script type="text/javascript">alert("学生数や席数を再度確認してください。");document.location.href = "./i.php";</script>';
        if (isset($_POST['stuname']) != true) {
            echo $alert;
        }
        $row = $_POST['row'];
        $col = $_POST['col'];
        $stunames = $_POST['stuname'];
        $aki = [];
        $seat = [];
        if (isset($_POST['useless']) == true) {
            $useless = $_POST['useless'];
        }
        if (isset($_POST['priority']) == true) {
            $priority = $_POST['priority'];
        }

        function tdspaceadd($j)
        {
            if (($j) % 2 == 0 && $j != 10) {
                echo '<td class="w-8"></td>';
            }
        }

        // makes seats available
        for ($i = 0; $i < ($row * $col); $i++) {
            //append seatable seats to aki[]
            array_push($aki, $i);
            array_push($seat, "");
        }
        // remove useless seat
        if (empty($useless) != 1) {
            $aki = array_diff($aki, $useless);
            $aki = array_values($aki);
        }
        
        
        
        // get random and divide settting seat
        $i = 0;
        $priority_seat_col = [];
        if (isset($_POST['priority']) == true) {
            foreach ($priority as $prio) {
                if (isset($seat[$i]) != true) {
                    echo $alert;
                }
                if (empty($useless) == 0) {
                    $temp = 0;
                    $k = 0;
                    while($k==0){
                        if ($i>=$col){
                            while(true){
                                $itis = false;
                                # foreach to pull $priority_seat_col as $pri
                                foreach ($priority_seat_col as $pri){
                                    # if ($i == $pri) now col is the priority col
                                    if (($i % $col) == $pri){
                                        $itis = true;
                                    }
                                }
                                # if this is not the priority col, then i++
                                if ($itis == false) {
                                    $i++;
                                }else{
                                    # if this is the priority col, then break
                                    break;
                                }
                            }
                        }

                        foreach ($useless as $key) {
                            if ($i == $key) {
                                $temp = 1;
                            }
                        }
                        if ($temp == 1) {
                            $i += 1;
                            $temp = 0;
                        } else{
                            $k = 1;
                        }
                        }
                }
                $seat[$i] = $prio;
                $aki = array_diff($aki, array($i));
                if ($i<$col){
                    array_push($priority_seat_col,$i);
                }
                $aki = array_values($aki);
                $i++;
            }
        }




        foreach ($stunames as $stuname) {
            $rand = rand(0, sizeof($aki) - 1);
            if (isset($seat[$aki[$rand]]) != true) {
                echo $alert;
            }
            $seat[$aki[$rand]] = $stuname;
            $aki = array_diff($aki, array($aki[$rand]));

            $aki = array_values($aki);
        }
        // make
        $stuval = 0;
        echo '<table class="mx-auto mt-40 table-fixed w-11/12 border-separate border-spacing-1 border-spacing-y-20 text-center"><tbody><tr>';
        for ($i = 0; $i < $row; $i++) {
            for ($j = 1; $j <= $col; $j++) {
                if (empty($useless) != 1) {
                    $k = 0;
                    foreach ($useless as $key) {
                        if ($stuval == $key) {
                            $k = 1;
                        }
                    }
                    if ($k == 1) {
                        $stuval += 1;
                        echo '<td class=" px-8 py-8 bg-gray-200 max-h-max rounded-md"></td>';
                        tdspaceadd($j);
                        continue;
                    }
                }
                if ($seat[$stuval] == "") {
                    $stuval += 1;
                    echo '<td class=" px-8 py-8 bg-gray-200 max-h-max rounded-md"></td>';
                    tdspaceadd($j);
                    continue;
                }
                echo '<td class="whitespace-nowrap mt-10 px-8 py-8 bg-gray-300 rounded-md"><div class="flex justify-center">' . $seat[$stuval] . '</div></td>';
                tdspaceadd($j);
                $stuval += 1;
            }
            echo ('</tr>');
        }
        echo '</tr></tbody></table>';
        ?>
    </div>
</body>

</html>