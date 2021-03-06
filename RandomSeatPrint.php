<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>ランダム席替え</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="min-h-max max-h-max bg-gray-100 bdy overflow-hidden" style="min-width:1400px;">
    <div class="mx-auto text-center">
        <h1 class="font-bold bg-gray-400 w-fit m-auto mb-16 rounded-bl-md rounded-br-md" style="width: 1200px;">前</h1>
        <div class="h-full w-12 fixed top-0 left-0 bg-gray-600 text-gray-200 pt-5">
            <h5 class="mt-96">廊<br><br><br><br>下<br><br><br><br>側</h5>
        </div>
        <div class="h-full w-12 fixed top-0 right-0 bg-gray-50 pt-5">
            <h5 class="mt-96">窓<br><br><br><br><br><br><br><br>側</h5>
        </div>
        <div class="float-right text-center bg-gray-800 text-neutral-100 w-1/12 py-8 rounded-md" style="margin-right: 15%;">教卓</div>
        <?php
        $alert = '<script type="text/javascript">alert("学生数や席数を再度確認してください。");document.location.href = "/randomseat";</script>';
        if (isset($_POST['stuname']) != true) {
            echo $alert;
        }
        $row = $_POST['row'];
        $col = $_POST['col'];
        $dm = $_POST['dm'];
        $stunames = $_POST['stuname'];
        if ($dm > ($row * $col)) {
            echo $alert;
        }
        $aki = [];
        $seat = [];
        if (isset($_POST['useless']) == true) {
            $useless = $_POST['useless'];
            if ($dm + sizeof($useless) > ($row * $col)) {
            echo $alert;
            }
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
            if (empty($useless) != 1) {
                $k = 0;
                foreach ($useless as $key) {
                    if ($i == $key) {
                        $k = 1;
                    }
                }
                if ($k == 1) {
                    $seat[] = "空き席";
                    continue;
                }
            }
            //makes seats and append seatable seats to $aki
            $seat[] = "";
            $aki[] = $i;
        }

        $priority_seat_col = [];
        //for ($i= 0; $i <($col*$row); $i++))
        if (isset($_POST['priority'])) {
            for ($i = 0; $i < ($col * $row); $i++) {
                if (empty($priority)){
                    break;
                }
                // if($seat[$i] == "空き席") then continue;
                if ($seat[$i] == "空き席") {
                    continue;
                }
                // if($i > $col) then compare if $seat[$i] is priority seat.
                $rand = rand(0, sizeof($priority) - 1);
                if ($i > $col - 1) {
                    if (in_array(($i % $col), $priority_seat_col)) {
                        $seat[$i] = $priority[$rand];
                        $aki = array_diff($aki, array($i));
                        $aki = array_values($aki);
                        $priority = array_diff($priority, array($priority[$rand]));
                        $priority = array_values($priority);
                        continue;
                    }
                } else {
                    // sit priority seats first then put them in $priority_seat_col and remove Item.
                    $seat[$i] = $priority[$rand];
                    $aki = array_diff($aki, array($i));
                    $aki = array_values($aki);
                    $priority_seat_col[] = $i;
                    $priority = array_diff($priority, array($priority[$rand]));
                    $priority = array_values($priority);
                    continue;
                }
            }
        }

        foreach ($stunames as $stuname){
            //priority is empty or $seat[$i] is not the priority seat, set this seat for normal students.
            $rand = rand(0, sizeof($aki) - 1);
            $seat[$aki[$rand]] = $stuname;
            $aki = array_diff($aki, array($aki[$rand]));
            $aki = array_values($aki);

        }

        // make table
        $stuval = 0;
        echo '<table class="mx-auto mt-40 table-fixed w-11/12 border-separate border-spacing-1 border-spacing-y-20 text-center"><tbody><tr>';
        for ($i = 0; $i < $row; $i++) {
            for ($j = 1; $j <= $col; $j++) {
                if ($seat[$stuval] == "空き席") {
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