export const REVIEW_AVATAR_STYLES = ['boy', 'girl', 'neutral'];

const REVIEW_AVATARS = {
  boy: '/reviews/avatars/hearts.png',
  girl: '/reviews/avatars/crystal.png',
  neutral: '/reviews/avatars/neutral.png',
};

export function normalizeReviewAvatarStyle(style) {
  return REVIEW_AVATAR_STYLES.includes(style) ? style : 'neutral';
}

export function getReviewAvatarPath(style) {
  return REVIEW_AVATARS[normalizeReviewAvatarStyle(style)];
}
