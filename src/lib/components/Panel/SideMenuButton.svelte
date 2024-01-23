<script>
  export let icon=undefined;
  export let title=undefined;
  export let href=undefined;
</script>

<a
  {href}
  class="bg-base-100 h-[1.3rem] rounded text-sm text-black flex items-center px-1 gap-2 cursor-pointer"
>
  <i class="text-md  {icon}"></i>
  {title}
</a>
