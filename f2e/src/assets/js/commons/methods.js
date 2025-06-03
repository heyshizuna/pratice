import { Anchor4 } from '@xwadex/fesd';

export const toBackend = (contents) => {
  if (!contents) return
  if (!document || !document?.body) return
  if (!document.body?.fesd) document.body.fesd = {}

  for (const [key, value] of Object.entries(contents)) {
    document.body.fesd[key] = value
  }

  return document.body.fesd
}

// collapse
export function collapseEvent(clickTarget, parentBox, anchor = false, single = false) {
  if (!clickTarget || !parentBox) return;

  const $clickTarget = $(clickTarget);
  const $parentBoxes = $(parentBox);
  if (!$clickTarget.length || !$parentBoxes.length) return;

  $clickTarget.on('click', function () {
    const $parent = $(this).closest(parentBox);
    if (!$parent.length) return;
    if ($parent.hasClass('open')) return $parent.removeClass('open');

    $parent.addClass('open');
    if (single) $parentBoxes.not($parent).removeClass('open');
    if (anchor) setTimeout(() => Anchor4.run({ target: $parent[0] }), 500);
  });
}

export function noContentCheck() {
  const params = new URLSearchParams(document.location.search);
  const val = params.get('debug');
  const contentBox = $('[data-content]')
  const noContentBox = $('[data-noContent]')
  if (!val || !contentBox || !noContentBox) return
  if (val.toLowerCase() === 'nocontent') {
    contentBox.hide();
    noContentBox.show();
  }
}

export function multipurposeAnchor(m4Area, m4Target, anchorTarget) {
  $(m4Area).on('click', m4Target, function () { 
    Anchor4.run({ target: $(anchorTarget)[0] })
  })
}